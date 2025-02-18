const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
require('dotenv').config();


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET 
});

const Deleteoncloudinary = async (uploadfilepath) => {
    try {
     
        if (!uploadfilepath) return "Not get LocalPath"
        // upload file 
        const parts = uploadfilepath.split("/");
        const filename = parts.pop().split(".")[0];

        const uploadResult = await cloudinary.api.delete_resources([filename],{ resource_type: 'image' })

        return uploadResult
    }
    catch (error) {
        console.log(error) 
        return null;
    }
}

module.exports = Deleteoncloudinary;