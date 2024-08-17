import React, { useState } from 'react';

const GallerySection = () => {
    // Array of image URLs
    const images = [
        'galleryimg1.jpg',
        'galleryimg2.jpg',
        'galleryimg3.jpg',
        'galleryimg4.jpg',
        'galleryimg5.jpg',
        'galleryimg6.jpg',
        'galleryimg7.jpg',
        'galleryimg8.jpg',
        'galleryimg9.jpg',
        'galleryimg10.jpg',
        'galleryimg11.jpg',
        'galleryimg12.jpg',
        'galleryimg13.jpg',
        'galleryimg14.jpg',
        'galleryimg15.jpg',
        'galleryimg16.jpg',
    ];

    // State for managing modal visibility and selected image
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to open the modal
    const openModal = (src) => {
        setSelectedImage(src);
    };

    // Function to close the modal
    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            setSelectedImage(null);
        }
    };

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className="w-full h-full cursor-pointer" onClick={() => openModal(src)}>
                            <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                        </div>
                    ))}
                </div>
                
                {/* Modal for enlarged image */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center" onClick={closeModal}>
                        <img src={selectedImage} alt="Enlarged view" className="max-w-full max-h-full object-contain" />
                    </div>
                )}
            </div>
        </section>
    );
};

const GalleryPage = () => {
    return (
        <div>
            <GallerySection />
        </div>
    );
};

export default GalleryPage;
