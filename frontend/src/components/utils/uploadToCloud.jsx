import axios from 'axios';

const uploadToCloud = async (image) => {
    if (!image) {
        console.error('No image provided for upload');
        return null;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
        const data = response.data;

        return data.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
};

export default uploadToCloud;