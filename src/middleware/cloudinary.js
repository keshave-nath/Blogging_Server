const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
require('dotenv').config();


    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const Uploadoncloudinary = async (localfilepath) => {
        try {
            // console.log(localfilepath)
            if (!localfilepath) return "Not get LocalPath"
            // upload file 
            const uploadResult = await cloudinary.uploader.upload(localfilepath,{asset_folder: 'uploads',resource_type: "auto"})
                fs.unlinkSync(localfilepath)
                // console.log("Cloud: "+uploadResult.url)
                return uploadResult
        }
        catch (error) {
            fs.unlinkSync(localfilepath) //remove the locally saved temp files as the upload failed
            return null;
        }
    }

module.exports= Uploadoncloudinary;
