const {validationResult} = require("express-validator");


const HttpError = require("../models/http-error");
const User = require("../models/user");

const USERS = [
    {
      id: "u1",
      name: "Ash Yas",
      email: "test1@gmail.com",
      password: "123123"
    },
    {
      id: "u2",
      name: "Bob Mike",
      email: "test2@gmail.com",
      password: "456456"
    },
    {
      id: "u3",
      name: "Joe Thomas",
      email: "test3@gmail.com",
      password: "789789"
    },

  ];


const getUsers = async (req, res, next) => {
  let usersList;

  try {
    usersList = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError("error occured. could not find users "+error, 500));
  }

  res.json({users: usersList.map(user => user.toObject({ getters: true }))});
};


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
        return next(new HttpError("email already exist!"), 422);
    }

    const newUser = new User({
      name,
      email,
      password,
      image: "https://cdn-icons-png.flaticon.com/512/21/21104.png",
      places: []
    });

    try{
      await newUser.save();
    } catch (error) {
      return next(new HttpError("Something went wrong, cannot create a user "+error, 500));
    }
    
    res.status(201).json({user: newUser.toObject({ getters: true })});
  };
  
  const login = async (req, res, next) => {
    const {email, password} = req.body;
    
    let exisitingUser;

    try {
      exisitingUser = await User.findOne({ email: email });
    } catch (error) {
      return next(new HttpError("Could not login. "+error, 500));
    }


    if(!exisitingUser || exisitingUser.password !== password){
        return next(new HttpError("user does not exisit."),401);
    }

    res.status(200).json({message: "Logged In!", user: exisitingUser.toObject({getters: true})})
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
