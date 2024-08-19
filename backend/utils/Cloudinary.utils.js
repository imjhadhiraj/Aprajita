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

export { deleteFromCloudinary };