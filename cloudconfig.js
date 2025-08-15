const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({       //to add backend to cloudinary we need to configure it
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV', // The folder in your Cloudinary account where the images will be stored
    allowerdFormats: ['jpg', 'png', 'jpeg'], // Allowed file formats
  },
});

module.exports = {
  cloudinary,   
  storage,       // Export the configured cloudinary instance and storage
}  