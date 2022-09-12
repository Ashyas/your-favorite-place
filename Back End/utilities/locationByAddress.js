const axios = require("axios");
const HttpError = require("../models/http-error");


const API_KEY = "";

const getCoordsForAddress = async (address) => {
    
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );

    const data = response.data;

    if(!data || data.status === "ZERO_RESULT"){
        throw new HttpError("Could Not find the location for the addresss", 404);
    }
    console.log(data);
    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;