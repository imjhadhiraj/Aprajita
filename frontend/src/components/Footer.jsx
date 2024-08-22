import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => (
    <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-xl mb-4">Preserving Culture</h3>
                    <p className="mb-4">Preserving culture is the bridge that connects our past with future generations.</p>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/theaprajita16?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                            <Facebook size={20} />
                        </a>
                        <a href="https://twitter.com/aprajita_fndtn" target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} />
                        </a>
                        <a href="https://www.linkedin.com/company/aprajita-foundation/" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://www.instagram.com/aprajita_foundation/" target="_blank" rel="noopener noreferrer">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Popular News</h4>
                    <ul className="space-y-2">
                        <li>About Us</li>
                        <li>Events</li>
                        <li>Donate</li>
                        <li>Gallery</li>
                        <li>Workshops</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Latest Events</h4>
                    <ul className="space-y-2">
                        <li>Akshat 2023</li>
                        <li>Anant Samarthya Sampanna 2023</li>
                        <li>Akshat 2022</li>
                        <li>Rangnayika</li>
                        <li>Anant Samarthya Sampanna 2022</li>
                    </ul>
                </div>
                <div id='contact'>
                    <h4 className="font-bold mb-4">Contact Us</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <MapPin size={16} className="mr-2" />
                            New Delhi, India
                        </li>
                        <li className="flex items-center">
                            <a href="tel:+918920445915" className="flex items-center">
                                <Phone size={16} className="mr-2" /> 08920445915
                            </a>
                        </li>
                        <li className="flex items-center">
                            <a href="theaprajita16@gmail.com" className="flex items-center">
                                <Mail size={16} className="mr-2" /> theaprajita16@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
