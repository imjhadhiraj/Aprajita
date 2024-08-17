import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// Modal Component for enlarged images
const Modal = ({ image, onClose }) => {
    if (!image) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center" onClick={onClose}>
            <img src={image} alt="Enlarged view" className="max-w-full max-h-full object-contain" />
        </div>
    );
};

const TeamMember = ({ name, role, image, fbLink, twitterLink, linkedinLink, instagramLink, onClick }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={image} alt={name} className="w-full h-48 object-contain cursor-pointer" onClick={() => onClick(image)} />
        <div className="p-4 text-center">
            <h3 className="font-bold text-xl mb-1">{name}</h3>
            <p className="text-gray-600 mb-4">{role}</p>
            <div className="flex justify-center space-x-4">
                {fbLink && (
                    <a href={fbLink} target="_blank" rel="noopener noreferrer">
                        <Facebook size={20} className="text-orange-500" />
                    </a>
                )}
                {twitterLink && (
                    <a href={twitterLink} target="_blank" rel="noopener noreferrer">
                        <Twitter size={20} className="text-orange-500" />
                    </a>
                )}
                {linkedinLink && (
                    <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                        <Linkedin size={20} className="text-orange-500" />
                    </a>
                )}
                {instagramLink && (
                    <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                        <Instagram size={20} className="text-orange-500" />
                    </a>
                )}
            </div>
        </div>
    </div>
);

const TeamSection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const teamMembers = [
        { 
            name: 'Soni Nilu Jha', 
            role: 'Founder', 
            image: 'founder.jpg', 
            fbLink: 'https://facebook.com/soninilu', 
            twitterLink: 'https://twitter.com/soninilu', 
            linkedinLink: 'https://linkedin.com/in/soninilu', 
            instagramLink: 'https://instagram.com/soninilu' 
        },
        { 
            name: 'Dhiraj Kumar Jha', 
            role: 'Event Management Head', 
            image: 'evmhead.jpg', 
            fbLink: 'https://facebook.com/dhirajkumar', 
            twitterLink: 'https://twitter.com/dhirajkumar', 
            linkedinLink: 'https://linkedin.com/in/dhirajkumar', 
            instagramLink: 'https://instagram.com/dhirajkumar' 
        },
        { 
            name: 'Shriya Jha', 
            role: 'PR Head', 
            image: 'prhead.jpg', 
            fbLink: 'https://facebook.com/shriyajha', 
            twitterLink: 'https://twitter.com/shriyajha', 
            linkedinLink: 'https://linkedin.com/in/shriyajha', 
            instagramLink: 'https://instagram.com/shriyajha' 
        },
        { 
            name: 'Kshitij Kumar', 
            role: 'Web Team Head', 
            image: 'webhead.jpg', 
            fbLink: 'https://facebook.com/kshitijkumar', 
            twitterLink: 'https://twitter.com/kshitijkumar', 
            linkedinLink: 'https://linkedin.com/in/kshitijkumar', 
            instagramLink: 'https://instagram.com/kshitijkumar' 
        },
        { 
            name: 'Krishna Rana', 
            role: 'Android Team Head', 
            image: 'androidhead.jpg', 
            fbLink: 'https://facebook.com/krishnarana', 
            twitterLink: 'https://twitter.com/krishnarana', 
            linkedinLink: 'https://linkedin.com/in/krishnarana', 
            instagramLink: 'https://instagram.com/krishnarana' 
        },
        { 
            name: 'Ashiti Jha', 
            role: 'Artist', 
            image: 'artist.jpg', 
            fbLink: 'https://facebook.com/ashitijha', 
            twitterLink: 'https://twitter.com/ashitijha', 
            linkedinLink: 'https://linkedin.com/in/ashitijha', 
            instagramLink: 'https://instagram.com/ashitijha' 
        },
        { 
            name: 'Rishav Chandra', 
            role: 'Design Head', 
            image: 'designhead.jpg', 
            fbLink: 'https://facebook.com/ashitijha', 
            twitterLink: 'https://twitter.com/ashitijha', 
            linkedinLink: 'https://linkedin.com/in/ashitijha', 
            instagramLink: 'https://instagram.com/ashitijha' 
        },
        { 
            name: 'Shivani Peelwan', 
            role: 'Special Educator', 
            image: 'spledu.jpg', 
            fbLink: 'https://facebook.com/ashitijha', 
            twitterLink: 'https://twitter.com/ashitijha', 
            linkedinLink: 'https://linkedin.com/in/ashitijha', 
            instagramLink: 'https://instagram.com/ashitijha' 
        },
        { 
            name: 'Ruchika', 
            role: 'Executive Head', 
            image: 'exechead.jpg', 
            fbLink: 'https://facebook.com/ashitijha', 
            twitterLink: 'https://twitter.com/ashitijha', 
            linkedinLink: 'https://linkedin.com/in/ashitijha', 
            instagramLink: 'https://instagram.com/ashitijha' 
        },
    ];

    return (
        <section className="py-12 bg-blue-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMember key={index} {...member} onClick={setSelectedImage} />
                    ))}
                </div>
            </div>
            <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
        </section>
    );
};

const NewsletterSection = () => (
    <section className="py-12 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Sign Up for Updates</h2>
            <p className="text-center mb-8">To be updated with all the latest news, offers and special announcements.</p>
            <form className="flex justify-center">
                <input type="email" placeholder="Your email address" className="px-4 py-2 rounded-l-lg w-64" />
                <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-r-lg">Subscribe</button>
            </form>
        </div>
    </section>
);

const TeamAndTestimonialPage = () => {
    return (
        <div>
            <TeamSection />
            <NewsletterSection />
        </div>
    );
};

export default TeamAndTestimonialPage;
