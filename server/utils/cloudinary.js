var cloudinary = require('cloudinary').v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: "codingnav",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

const uploadImage = async (uploadedFile) => {
    return new Promise((resolve, reject) => {
        const { createReadStream } = uploadedFile;

        const stream = cloudinary.uploader.upload_stream(function (error, result) {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
        createReadStream().pipe(stream);
    });
}

module.exports = { uploadImage };