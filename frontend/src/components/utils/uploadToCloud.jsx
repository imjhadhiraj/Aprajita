import axios from 'axios';

// Async function to upload image to Cloudinary
const uploadToCloud = async (image) => {
    if (!image) {
        console.error('No image provided for upload');
        return null;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'fiverr'); // Replace with your actual upload preset
    formData.append('cloud_name', 'dqlbkq7np'); // This is usually set in the URL

    try {
        // Upload image to Cloudinary
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
        const data = response.data;

        // Return the secure URL of the uploaded image
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export default uploadToCloud;