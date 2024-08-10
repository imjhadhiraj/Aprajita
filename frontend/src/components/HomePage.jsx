import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

const Homepage = () => {
    return (
        <div className="font-sans">
            {/* Top bar */}
            <div className="bg-orange-500 text-white p-2 flex justify-between items-center">
                <div className="flex space-x-2">
                    <a href="https://www.facebook.com" target='_blank'>
                        <Facebook className='cursor-pointer' size={20} />
                    </a>
                    <a href="https://www.twitter.com" target='_blank'>
                        <Twitter className='cursor-pointer' size={20} />
                    </a>
                    <a href="https://www.linkedin.com" target='_blank'>
                        <Linkedin className='cursor-pointer' size={20} />
                    </a>
                    <a href="https://www.instagram.com" target='_blank'>
                        <Instagram className='cursor-pointer' size={20} />
                    </a>
                </div>
                <div className="flex space-x-4">
                    <button className="text-sm">Support</button>
                    <button className="text-sm">FAQ's</button>
                    <button className="text-sm">Help</button>
                </div>
            </div>

            {/* Header */}
            <header className="bg-white p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-orange-500 rounded-full">
                        <img src="logo.jpg" alt="logo" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className="font-bold text-xl">Aprajita Foundation</span>
                </div>
                <div className="flex items-center space-x-4">
                    <a className="flex items-center" href="mailto:theaprajita16@gmail.com">
                        <Mail className="text-orange-500 mr-2" />
                        <span className="text-sm">theaprajita16@gmail.com</span>
                    </a>

                    <a className="flex items-center" href="tel:+919289228351">
                        <Phone className="text-orange-500 mr-2" />
                        <span className="text-sm">09289228351</span>
                    </a>

                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-gray-800 text-white p-4">
                <ul className="flex justify-between items-center">
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>GALLERY</li>
                    <li>CAMPAIGNS</li>
                    <li>EVENTS</li>
                    <li>FAQ'S</li>
                    <li>BLOG</li>
                    <li>CONTACT US</li>
                    <li>
                        <button className="bg-orange-500 px-4 py-2 rounded">DONATE NOW</button>
                    </li>
                </ul>
            </nav>

            {/* Hero Section */}
            <div className="relative h-96 bg-gray-300">
                <img src="" alt="banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="text-orange-500">FEED</span> AND EDUCATE
                    </h1>
                    <p className="text-center max-w-md mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="flex space-x-4">
                        <button className="bg-orange-500 text-white px-6 py-2 rounded">DONATE NOW</button>
                        <button className="bg-white text-gray-800 px-6 py-2 rounded">READ MORE</button>
                    </div>
                </div>
            </div>

            {/* Action Boxes */}
            <div className="flex justify-around py-8 bg-gray-100">
                {['Send Donation', 'Become Volunteer', 'Give Inspiration'].map((text, index) => (
                    <div key={index} className="w-1/4 p-4 bg-white shadow-md text-center">
                        <h3 className="font-bold text-xl mb-2">{text}</h3>
                        <p className="text-sm">It is a long established fact that a reader will be distracted by the readable content.</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;