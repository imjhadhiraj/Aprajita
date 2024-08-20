import axios from 'axios';
import { useEffect, useState } from 'react';

const GalleryPage = () => {
    const [images, setImages] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    const fetchGalleryImages = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-gallery-images`);
            setImages(response.data);
            console.log(response.data)
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
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2>
                <div className="flex flex-wrap gap-4 mb-4">
                    {images.map((preview) => (
                        <div key={preview._id} className="cursor-pointer" onClick={() => openModal(preview.image)}>
                            <img
                                className="max-w-96 max-h-96 object-cover rounded-lg"
                                src={preview.image}
                                alt={`Selected ${preview._id}`}
                            />

                        </div>
                    ))}
                </div>

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
