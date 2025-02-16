const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
require('dotenv').config();


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const Deleteoncloudinary = async (uploadfilepath) => {
    try {
        // console.log(uploadfilepath)
        if (!uploadfilepath) return "Not get LocalPath"
        // upload file 
        const parts = uploadfilepath.split("/");
        const filename = parts.pop().split(".")[0];
        // const folderPath = parts.slice(parts.indexOf("uploads") + 1).join("/"); // Get folder path

        // console.log(folderPath)
        // const path = `${folderPath}/${filename}`

        const uploadResult = await cloudinary.api.delete_resources([filename],{ resource_type: 'image' })

        return uploadResult
    }
    catch (error) {
        console.log(error) //remove the locally saved temp files as the upload failed
        return null;
    }
}

module.exports = Deleteoncloudinary;