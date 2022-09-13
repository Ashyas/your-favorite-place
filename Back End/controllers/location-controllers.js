const fs = require("fs");
const mongoose = require("mongoose");
const {validationResult} = require("express-validator");

const User = require("../models/user");
const Place = require("../models/place");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../utilities/locationByAddress");


const getPlaces = async (req, res, next) => {

    let placesList;
    
    try {
        placesList = await Place.find({});

    } catch (error) {
        return next (new HttpError("Couldn't fetch the place", 500));
    }

    res.json({places: placesList.map(place => place.toObject({ getters: true }))});
}



const getPlaceById = async (req, res, next) =>{

    const placeId = req.params.pid;
    let place;
    
    try {
        place = await Place.findById(placeId);

    } catch (error) {
        return next (new HttpError("Couldn't find the place", 500));
    }

    if(!place) {
        return next(new HttpError("Could not find a place for this id", 404));
    }

    res.json({place: place.toObject( {getters:true} )});
}


const getPlacesByUserId = async (req, res, next) =>{

    const userId = req.params.uid;

    let places;

    try {
        places  = await Place.find( {creator: userId} );
    } catch (error) {
        return next (new HttpError("Couldn't find a place by this Id", 500));
    }

    if(!places || places.length === 0) {
        return next(new HttpError("Could not find a places for this userId", 404));
    }
    res.json({places: places.map(place =>place.toObject( {getters: true} ))});
}


const createPlace = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("error occured. invalid inputs", 422));
    }

    const {title, description, address} = req.body;
    let coordinates;

    try{
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdLocation = new Place({
        title,
        creator: req.userData.userId,
        address,
        description,
        location: coordinates,
        image: req.file.path
    });

    let user;

    try {
        user = await User.findById(req.userData.userId);        
    } catch (error) {
        return next(new HttpError("creating place faild. " + error, 500));
    }
    
    if(!user){
        return next(new HttpError("could not find user for this id", 404));
    }
    console.log(user);

    try {        
        const userUession = await mongoose.startSession();
        userUession.startTransaction();
        await createdLocation.save({ session: userUession });
        user.places.push(createdLocation);
        await user.save({ session: userUession });
        await userUession.commitTransaction();
    } catch (error) {
        return next(new HttpError("creating place faild. " + error, 500));
    }

    res.status(201).json({place: createdLocation});
} 



const updatePlace = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("error occured. invalid inputs", 422));
    }

    const {title, description} = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (error) {
       return next( new HttpError("Could not find that place" + error, 500)); 
    }

    if (place.creator.toString() !== req.userData.userId) {
        return next( new HttpError("Not allowed to edit! use your account!" , 401)); 

    }
    
    place.title = title;
    place.description = description;
    
    try {
        await place.save();
    } catch (error) {
        return next( new HttpError("something went wrong" + error, 500)); 
    }

    res.status(200).json({place: place.toObject( {getters:true} )});

}



const deletePlace = async (req, res, next) => {
    
    const placeId = req.params.pid;

    let place;

    try {
        place = await Place.findById(placeId).populate("creator");
    } catch (error) {

        return next(new HttpError("Could not find the place. " + error, 500));
    }

    if(!place){
        return next(new HttpError("Could not find the place to delete. ", 404));
    }

    if (place.creator.id !== req.userData.userId) {
        return next( new HttpError("Not allowed to delete! use your account!" , 401)); 

    }

    const imagePath = place.image;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();

    } catch (error) {
        return next(new HttpError("Could not delete the place. " + error, 500));
    }
    fs.unlink(imagePath, err => console.log(err));

    res.status(200).json({message: "The Place has been Deleted"});
}

exports.getPlaces = getPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
