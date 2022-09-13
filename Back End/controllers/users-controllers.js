const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const HttpError = require("../models/http-error");
const User = require("../models/user");


const getUsers = async (req, res, next) => {

  let usersList;

  try {
    usersList = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError("error occured. could not find users "+error, 500));
  }

  res.json({users: usersList.map(user => user.toObject({ getters: true }))});
};


const getUserById = async (req, res, next) => {

  const userId = req.params.uid;
  let user;
    
  try {
    user = await User.findById(userId);

  } catch (error) {
      return next (new HttpError("Couldn't find the user", 500));
  }

  if(!user) {
      return next(new HttpError("Could not find a user", 404));
  }

  res.json({user: user.toObject( {getters:true} )});
}



const signup = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return next(new HttpError("error occured. invalid inputs!", 422));
    }
    
    const {name, email, password} = req.body;

    let exisitingUser;

    try {
      exisitingUser = await User.findOne({ email: email });
    } catch (error) {
      return next(new HttpError("Could not signup. "+error, 500));
    }
    
    if(exisitingUser){
        return next(new HttpError("user already exist!"), 422);
    }
    
   
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 12);
      
    } catch (error) {
      return next(new HttpError("Could not generate safe password", 500));
    }
   
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: req.file.path,
      places: []
    });

    try{
      await newUser.save();
    } catch (error) {
      return next(new HttpError("Something went wrong, cannot create a user "+error, 500));
    }

    let token;
    try {
      
      token = await jwt.sign({userId: newUser.id, email: newUser.email}, "some_very_long_secret_string_to _encode", {expiresIn: "1h"});

    } catch (error) {
      return next(new HttpError("Something went wrong, cannot create a user "+error, 500));

    }
    
    res.status(201).json({userId: newUser.id, email: newUser.email, token: token });
  };


  
  const login = async (req, res, next) => {
    
    const {email, password} = req.body;
    
    let exisitingUser;

    try {
      exisitingUser = await User.findOne({ email: email });
    } catch (error) {
      return next(new HttpError("Could not login. "+error, 500));
    }


    if(!exisitingUser ){
        return next(new HttpError("Invalid, could not log in.", 403));
    }

    let isValidPassword = false;

    try {
      isValidPassword = await bcrypt.compare(password, exisitingUser.password);
    } catch (error) {
      return next(new HttpError("could not sign in.", 500));
    }

    if(!isValidPassword){
      return next(new HttpError("could not sign in.", 403));
    }


    let token;
    try {
      
      token = await jwt.sign({userId: exisitingUser.id, email: exisitingUser.email}, "some_very_long_secret_string_to _encode", {expiresIn: "1h"});

    } catch (error) {
      return next(new HttpError("Something went wrong, couldn't login "+error, 500));

    }
    res.json({userId: exisitingUser.id, email: exisitingUser.email, token: token });
};


exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
