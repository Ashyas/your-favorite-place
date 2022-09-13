const express = require("express");
const {check} = require("express-validator");

const locationControllers = require("../controllers/location-controllers");
const fileUpload = require("../shared/file-upload");
const checkAuth = require("../shared/check-auth.js");

const router = express.Router();

router.get("/", locationControllers.getPlaces);

router.get("/:pid", locationControllers.getPlaceById);

router.get("/user/:uid", locationControllers.getPlacesByUserId);

router.use(checkAuth);

router.post("/",
    fileUpload.single('image'),
    [
        check("title").not().isEmpty(),
        check("address").not().isEmpty(),
        check("description").isLength({min: 5})
    ], locationControllers.createPlace
);

router.patch("/:pid", [
    check("title").not().isEmpty(),
    check("description").isLength({min: 5})
], locationControllers.updatePlace);

router.delete("/:pid", locationControllers.deletePlace);

module.exports = router;