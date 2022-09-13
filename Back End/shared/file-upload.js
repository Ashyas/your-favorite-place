const multer = require("multer");
const uuid = require("uuid").v4

const IMAGE_EXTENSION = {
    "image/jpeg": "gpej",
    "image/jpg": "jpg",
    "image/png": "png"
}

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, "uploads/images");

        },
        filename: (req, file, callBack) => {
            const extention = IMAGE_EXTENSION[file.mimetype]
            callBack(null, uuid() + '.' + extention);
        }
    }),
    fileFilter: (req, file, callBack) => {
        const isValid = !!IMAGE_EXTENSION[file.mimetype];
        let error = isValid ? null : new Error("Invalid Mime Type!");
        callBack(error, isValid);
    }
});

module.exports = fileUpload;