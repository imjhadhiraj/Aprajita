import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="font-sans">
            {/* Top bar */}
            {/* <div className="bg-orange-500 text-white p-2 flex justify-between items-center">
                <div className="flex space-x-2">
                    <a href="https://www.facebook.com/theaprajita16?mibextid=ZbWKwL" target='_blank' rel="noopener noreferrer">
                        <Facebook className='cursor-pointer' size={20} />
                    </a>
                    <a href="https://twitter.com/aprajita_fndtn" target='_blank' rel="noopener noreferrer">
                        <Twitter className='cursor-pointer' size={20} />
                    </a>
                    <a href="https://www.linkedin.com/company/aprajita-foundation/" target='_blank' rel="noopener noreferrer">
                        <Linkedin className='cursor-pointer' size={20} />
                    </a>
                    <a href="https://www.instagram.com/aprajita_foundation/" target='_blank' rel="noopener noreferrer">
                        <Instagram className='cursor-pointer' size={20} />
                    </a>
                </div>
                <div className="hidden md:flex space-x-4">
                    <button className="text-sm">Support</button>
                    <button className="text-sm">FAQ's</button>
                    <button className="text-sm">Help</button>
                </div>
            </div> */}

            {/* Header */}
            <header className="bg-white p-2 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-orange-500 rounded-full">
                        <img src="logo.jpg" alt="logo" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className="font-bold text-xl">Aprajita Foundation</span>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <a className="flex items-center" href="mailto:theaprajita16@gmail.com">
                        <Mail className="text-orange-500 mr-2" />
                        <span className="text-sm">theaprajita16@gmail.com</span>
                    </a>
                    <a className="flex items-center" href="tel:+918920445915">
                        <Phone className="text-orange-500 mr-2" />
                        <span className="text-sm">08920445915</span>
                    </a>
                </div>
                <button className="md:hidden" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Navigation */}
            <nav className={`bg-gray-800 text-white p-2 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                <div className="flex flex-col md:flex-row justify-between items-center md:px-4">
                    <span className="py-2 md:py-1 cursor-pointer">HOME</span>
                    <Link to='ReadMore' className="py-2 md:py-1 cursor-pointer">ABOUT US</Link>
                    <a href='#gallery' className="py-2 md:py-1 cursor-pointer">GALLERY</a>
                    <a href='#campaign' className="py-2 md:py-1 cursor-pointer">CAMPAIGNS</a>
                    <a href='#events' className="py-2 md:py-1 cursor-pointer">EVENTS</a>
                    {/* <a href='#' className="py-2 md:py-1 cursor-pointer">FAQ'S</a> */}
                    {/* <a href='#' className="py-2 md:py-1 cursor-pointer">BLOG</a> */}
                    <a href='#contact' className="py-2 md:py-1 cursor-pointer">CONTACT US</a>
                    <a href='#donate' className="py-2 md:py-1 cursor-pointer">
                        <button className="bg-orange-500 px-4 py-1 rounded">DONATE NOW</button>
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-96 bg-gray-300">
                <img src="banner.jpeg" alt="banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
                        <span className="text-orange-500 block mb-4">Women Empowerment</span>
                        <span className="block mb-4">AND</span>
                        <span className="text-orange-500 block">Culture Preservation</span>
                    </h1>
                    <p className="text-center max-w-md mb-8">
                        Aprajita Foundation empowers women and keeps our cultural traditions alive, making a difference in everyday lives.
                    </p>
                    <div className="flex space-x-4">
                        <a href='#donate' className="bg-orange-500 text-white px-6 py-2 rounded">DONATE NOW</a>
                        <Link to='ReadMore' className="bg-white text-gray-800 px-6 py-2 rounded">READ MORE</Link>
                    </div>
                </div>
            </div>

            {/* Action Boxes */}
            <div className="flex flex-col md:flex-row justify-around py-8 bg-gray-100">
                {[
                    { title: 'Send Donation', content: 'Your contribution helps us drive impactful projects and support those in need.' },
                    { title: 'Become Volunteer', content: 'Join us in our mission to make a difference by contributing your time and skills.' },
                    { title: 'Give Inspiration', content: 'Share your story or ideas to inspire others and spread positivity.' }
                ].map((item, index) => (
                    <div key={index} className="w-full md:w-1/4 p-4 bg-white shadow-md text-center mb-4 md:mb-0">
                        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-sm">{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;