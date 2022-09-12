const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const locationsRoutes = require("./routes/locations-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/places' ,locationsRoutes);
app.use('/api/users' ,userRoutes);

app.use((req, res, next) => {
    return next(new HttpError("Could not find route", 404));
});

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "Unknown error occurred "});
});


mongoose.connect("mongodb+srv://ashya:SomePass123@cluster0.brkguls.mongodb.net/Places?retryWrites=true&w=majority")
    .then(() => app.listen(5000))
    .catch(error => console.log(error));

