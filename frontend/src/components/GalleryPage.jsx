import axios from 'axios';
import { useEffect, useState } from 'react';

const GalleryPage = () => {
    const [images, setImages] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagesAll, setImagesAll] = useState(false)

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    const fetchGalleryImages = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-gallery-images`);
            setImages(response.data);
            setImagesAll(false)
        } catch (err) {
            console.log(err)
        }
    };

    const handleAllImages = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-gallery-images`);
            if (response.status === 200) {
                setImages(response.data);
                setImagesAll(true);
            }
        } catch (err) {
            console.log(err)
        }
    };

    const openModal = (src) => {
        setSelectedImage(src);
    };

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            setSelectedImage(null);
        }
    };

    return (
        <section id='gallery' className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2>
                <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bentogrid">
                        {images.map((preview) => (
                            <div key={preview._id} className="bentogrid-item cursor-pointer" onClick={() => openModal(preview.image)}>
                                <img
                                    src={preview.image}
                                    alt={`Selected ${preview._id}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {!imagesAll ? (<button onClick={handleAllImages} className="block mx-auto items-center text-blue-600 cursor-pointer font-semibold text-lg py-2">
                    View more
                </button>)
                    : (<button onClick={fetchGalleryImages} className="block mx-auto text-blue-600 cursor-pointer font-semibold text-lg py-2">
                        View less
                    </button>)
                }
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={closeModal}>
                        <img src={selectedImage} alt="Enlarged view" className="max-w-full max-h-full object-contain" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default GalleryPage;
