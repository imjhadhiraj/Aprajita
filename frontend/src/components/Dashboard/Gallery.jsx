import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from "../Loader"
const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
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
        finally {
            setIsModalOpen(false);
        }
    };

    const handleButtonClick = async () => {
        await fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFile(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreview(previews);
    };

    const handleAddImage = async () => {
        if (!selectedFile) {
            toast.error('Please select a file first!');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/upload-gallery-image`, {
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


    const openModal = (id) => {
        setImageToDelete(id);
        setIsModalOpen(true);
    };

    if (isLoading) return <div className="text-center mt-8"><Loader /></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Gallery</h1>
            <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                className='hidden'
                onChange={handleFileChange}
            />
            {
                !selectedFile ? (<button className="mb-6 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleButtonClick}>Add Image</button>) : (
                    <div className='flex'>
                        {imagePreview.map((preview, index) => (
                            <img
                                key={index}
                                className="object-contain h-32 mb-2 rounded-lg mr-2"
                                src={preview}
                                alt={`Selected ${index}`}
                            />
                        ))}
                        <button className="mb-6 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12"
                            onClick={handleAddImage}>Upload Image</button>
                    </div>
                )
            }

            <div
                className="gallery-scroll-area scrollbar-thin h-[75vh] overflow-y-auto p-4 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img, index) => (
                    <div
                        key={img._id}
                        className={`relative group ${index % 5 === 0 ? 'row-span-2' : ''} ${index % 7 === 0 ? 'col-span-2' : ''}`}>
                        <img
                            src={img.image}
                            alt="Gallery item"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                            onClick={() => openModal(img._id)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded hidden group-hover:block"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">Are you sure you want to delete this image?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(imageToDelete)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;