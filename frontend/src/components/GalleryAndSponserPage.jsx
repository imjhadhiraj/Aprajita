import React from 'react';

const GallerySection = () => {
    // In a real application, you'd fetch these image URLs from your backend
    const images = Array(15).fill('/api/placeholder/300/200');

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className={`${index === 2 || index === 5 ? 'col-span-2 row-span-2' : ''}`}>
                            <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const NewsSection = () => {
    const newsItems = [
        { title: 'TEST SEND DONATION', image: '/api/placeholder/400/300' },
        { title: 'SEND DONATION', image: '/api/placeholder/400/300' },
        { title: 'GIVE INSPIRATION TEST', image: '/api/placeholder/400/300' },
    ];

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newsItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300">
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const SponsorsSection = () => {
    const sponsors = ['BankSystem', 'HartDel', 'BarterCard', 'InterSystems', 'RightSail'];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Top Sponsors</h2>
                <p className="text-center text-gray-600 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex justify-center items-center space-x-8">
                    {sponsors.map((sponsor, index) => (
                        <div key={index} className="text-gray-400 font-bold text-xl">
                            {sponsor}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const GalleryAndSponsorsPage = () => {
    return (
        <div>
            <GallerySection />
            <NewsSection />
            <SponsorsSection />
        </div>
    );
};

export default GalleryAndSponsorsPage;