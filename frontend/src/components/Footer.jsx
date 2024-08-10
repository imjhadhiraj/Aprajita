import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => (
    <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-xl mb-4">Serve Humanity</h3>
                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div className="flex space-x-4">
                        <Facebook size={20} />
                        <Twitter size={20} />
                        <Linkedin size={20} />
                        <Instagram size={20} />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Popular News</h4>
                    <ul className="space-y-2">
                        <li>About Charity Work</li>
                        <li>Campaigns</li>
                        <li>Donate</li>
                        <li>Blog</li>
                        <li>News</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Latest Posts</h4>
                    <ul className="space-y-2">
                        <li>We do this for the family</li>
                        <li>Be the first to know why</li>
                        <li>Donate for people's health</li>
                        <li>This is the way to win</li>
                        <li>Be ready for the next round</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Contact Us</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center"><MapPin size={16} className="mr-2" /> 123 Street, City, Country</li>
                        <li className="flex items-center"><Phone size={16} className="mr-2" /> +1234567890</li>
                        <li className="flex items-center"><Mail size={16} className="mr-2" /> info@servehumanity.org</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;