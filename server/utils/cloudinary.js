var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "codingnav",
    api_key: "188557862644144",
    api_secret: "RVuAlOvLwf9hRp2JQ9ifmCXvDGU",
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