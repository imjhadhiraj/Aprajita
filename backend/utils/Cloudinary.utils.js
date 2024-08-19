import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
    secure: true
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!fs.existsSync(localFilePath)) {
            console.error("File does not exist:", localFilePath);
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            secure: true,
        });

        console.log(localFilePath)

        fs.unlinkSync(localFilePath); // Delete the file after uploading

        const secureUrl = response?.secure_url || response?.url.replace('http://', 'https://');
        response.url = secureUrl;
        return response;
    } catch (error) {
        console.error("Error while uploading to Cloudinary:", error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Ensure the file is deleted if an error occurs
        }
        return null;
    }
}

const deleteFromCloudinary = async (imageUrl) => {
    try {
        const publicId = imageUrl.split('/').pop().split('.')[0];
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === 'ok') {
            console.log('Old Image deleted successfully');
        } else {
            console.error('Failed to delete image:', result);
        }
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };