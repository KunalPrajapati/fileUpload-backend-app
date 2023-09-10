const cloudinary = require('cloudinary').v2;
require('dotenv').config(); 

//cloudinary configuration 
exports.cloudinaryConnect = () => {

    try {
        
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });



    } catch (error) {
    
        console.log(error)

    }


}