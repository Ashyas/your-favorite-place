const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    
    if(req.method === 'OPTIONS') {
        return next();
    }
    try {
        
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            throw new Error("Authontication failes");
        }
        const decodedToken = jwt.verify(token, "some_very_long_secret_string_to _encode");
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (error) {
        return next(new HttpError("Authontication failes", 403));
    }
   
}