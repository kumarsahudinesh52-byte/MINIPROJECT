//We install twon packages cloudinary and multer-storage-cloudinary 
//now we set the connection here
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : "wanderlust_DEV", //mean in cloudinary in this folder the data will save 
        //it create a folder with this name if not exist
        allowedFormats : ["png", "jpg", "jpeg"], //This type images is allowed
    },
});

module.exports = {
    cloudinary,
    storage,
};
