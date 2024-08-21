import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import uploadToCloud from '../../utils/uploadToCloud';
import { PlusCircle, Trash2, Upload, X } from 'lucide-react';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-gallery-images`);
            setImages(response.data);
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Failed to fetch images');
        } finally {
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

        } finally {
            setIsModalOpen(false);
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreview(previews);
    };

    const handleAddImage = async () => {
        if (selectedFiles.length === 0) {
            toast.error('Please select a file first!');
            return;
        }

        setIsLoading(true);
        try {
            const uploadPromises = selectedFiles.map(file => uploadToCloud(file));
            const uploadedUrls = await Promise.all(uploadPromises);

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/upload-gallery-image`,
                { images: uploadedUrls },
                { withCredentials: true }
            );

            if (response.status === 200) {
                toast.success(response.data.message);
                fetchImages();
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Failed to upload image');

        } finally {
            setSelectedFiles([]);
            setImagePreview([]);
            setIsLoading(false);
        }
    };

    const openModal = (id) => {
        setImageToDelete(id);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Gallery</h1>

                <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {selectedFiles.length === 0 ? (
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <PlusCircle className="h-5 w-5 mr-2" />
                            Add Images
                        </button>
                    ) : (
                        <div>
                            <div className="flex flex-wrap gap-4 mb-4">
                                {imagePreview.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            className="h-24 w-24 object-cover rounded-lg"
                                            src={preview}
                                            alt={`Selected ${index}`}
                                        />
                                        <button
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                                            onClick={() => {
                                                setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
                                                setImagePreview(imagePreview.filter((_, i) => i !== index));
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={handleAddImage}
                            >
                                <Upload className="h-5 w-5 mr-2" />
                                Upload Image{selectedFiles.length > 1 ? 's' : ''}
                            </button>
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map((img) => (
                            <div key={img._id} className="relative group">
                                <img
                                    src={img.image}
                                    alt="Gallery item"
                                    className="w-full h-64 object-cover rounded-lg shadow-md transition duration-300 ease-in-out transform group-hover:scale-105"
                                />
                                <button
                                    onClick={() => openModal(img._id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out transform hover:scale-110"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
                            <p className="mb-6 text-gray-600">Are you sure you want to delete this image? This action cannot be undone.</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(imageToDelete)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;