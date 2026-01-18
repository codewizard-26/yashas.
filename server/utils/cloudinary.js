require('dotenv').config();
const v2 = require('cloudinary')
const fs = require('fs')

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const fileUpload = async (localFilePath) => {
    try {
        if (!localFilePath) return "File path not found"

        //upload the file on cloudinary
        const response = await v2.uploader.upload(localFilePath, {
            resource_type : "auto"
        })

        //file uploaded successfully
        console.log("File is uploaded on cloudinary", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file
        return "file did not uploaded";
    }
}

module.exports = fileUpload