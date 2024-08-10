import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const TeamMember = ({ name, role, image }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4 text-center">
            <h3 className="font-bold text-xl mb-1">{name}</h3>
            <p className="text-gray-600 mb-4">{role}</p>
            <div className="flex justify-center space-x-2">
                <Facebook size={20} className="text-orange-500" />
                <Twitter size={20} className="text-orange-500" />
                <Linkedin size={20} className="text-orange-500" />
                <Instagram size={20} className="text-orange-500" />
            </div>
        </div>
    </div>
);

const TeamSection = () => {
    const teamMembers = [
        { name: 'SIMON JACKSON', role: 'Volunteer', image: '/api/placeholder/300/300' },
        { name: 'IAN JACKSON', role: 'Volunteer', image: '/api/placeholder/300/300' },
        { name: 'BERNADETTE GLOVER', role: 'Volunteer', image: '/api/placeholder/300/300' },
    ];

    return (
        <section className="py-12 bg-blue-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMember key={index} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ name, image, text }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <img src={image} alt={name} className="w-20 h-20 rounded-full mb-4" />
        <p className="text-gray-600 text-center mb-4">{text}</p>
        <h4 className="font-bold">{name}</h4>
    </div>
);

const TestimonialsSection = () => {
    const testimonials = [
        { name: 'BEAN ALLAN', image: '/api/placeholder/80/80', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { name: 'ROSS MCHAREN', image: '/api/placeholder/80/80', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { name: 'JON POSMIK', image: '/api/placeholder/80/80', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
        { name: 'BERNADETTE GLOVER', image: '/api/placeholder/80/80', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const StatisticsSection = () => {
    const stats = [
        { value: '350', label: 'TOTAL DONORS' },
        { value: '3150', label: 'TOTAL VOLUNTEERS' },
        { value: '1220', label: 'TOTAL PROJECTS' },
        { value: '65', label: 'RUNNING PROJECTS' },
    ];

    return (
        <section className="py-12 bg-orange-500 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
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
            <TestimonialsSection />
            <StatisticsSection />
            <NewsletterSection />
        </div>
    );
};

export default TeamAndTestimonialPage;