import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-gallery-images`); // Adjust the endpoint as needed
            setImages(response.data);
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Failed to fetch images');
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/delete-gallery-image/${id}`, { withCredentials: true });
            setImages(images.filter(img => img._id !== id));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Failed to delete image');
        }
    };

    const handleButtonClick = async () => {
        await fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]));
    };

    const handleAddImage = async () => {
        if (!selectedFile) {
            toast.error('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('galleryImg', selectedFile);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/upload-gallery-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Failed to upload image');
        }
        finally {
            setSelectedFile(null);
            setImagePreview(null);
            fetchImages();
        }
    };

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Gallery</h1>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className='hidden'
                onChange={handleFileChange}
            />
            {
                !selectedFile ? (<button className="mb-6 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleButtonClick}>Add Image</button>) : (
                    <div className='flex'>
                        {imagePreview && <img className='object-contain h-32 mb-2 rounded-lg' src={imagePreview} alt="Selected" />}
                        <button className="mb-6 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12"
                            onClick={handleAddImage}>Upload Image</button>
                    </div>
                )
            }


            <div className="gallery-scroll-area h-[75vh] overflow-y-auto p-4 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img) => (
                    <div key={img._id} className="relative group">
                        <img
                            src={img.image}
                            alt="Gallery item"
                            className="rounded-lg"
                        />
                        <button
                            onClick={() => handleDelete(img._id)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;