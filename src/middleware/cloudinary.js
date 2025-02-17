const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
require('dotenv').config();

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });

    const Uploadoncloudinary = async (localfilepath) => {
        try {
            
            if (!localfilepath) return "Not get LocalPath"
            // upload file 
            const uploadResult = await cloudinary.uploader.upload(localfilepath,{asset_folder: 'uploads',resource_type: "auto"})
                fs.unlinkSync(localfilepath)
                
                return uploadResult
        }
        catch (error) {
            fs.unlinkSync(localfilepath) 
            return null;
        }
    }

module.exports= Uploadoncloudinary;
