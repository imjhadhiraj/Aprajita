import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, Calendar, ArrowRight } from 'lucide-react';

const CampaignPage = () => {
    return (
        <div className="font-sans">
            {/* Previous sections (top bar, header, navigation) remain the same */}

            {/* Campaign Cards */}
            <div className="flex justify-between p-8 bg-orange-100">
                {['Another Campaign', 'Next Campaign', 'Building Hospitals'].map((campaign, index) => (
                    <div key={index} className="w-1/4 bg-white p-4 rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-orange-500 rounded-full mb-4 flex items-center justify-center text-white">
                            <ArrowRight />
                        </div>
                        <h3 className="font-bold text-xl mb-2">{campaign}</h3>
                        <p className="text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded">Read More</button>
                    </div>
                ))}
            </div>

            {/* Feature Campaign and Latest Events */}
            <div className="flex p-8">
                <div className="w-1/2 pr-4">
                    <h2 className="text-2xl font-bold mb-4">Feature Campaign</h2>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <img src="/api/placeholder/400/300" alt="Featured campaign" className="w-full mb-4 rounded" />
                        <h3 className="font-bold text-xl mb-2">TEST CAMPAIGN</h3>
                        <p className="text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="font-bold">$500</span> to go
                            </div>
                            <div>
                                <span className="font-bold">80%</span> funded
                            </div>
                        </div>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded">Donate Now</button>
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <h2 className="text-2xl font-bold mb-4">Latest Events</h2>
                    {[1, 2, 3].map((event) => (
                        <div key={event} className="flex mb-4 bg-white p-4 rounded-lg shadow-md">
                            <div className="w-1/4 pr-4">
                                <img src="/api/placeholder/100/100" alt={`Event ${event}`} className="w-full rounded" />
                            </div>
                            <div className="w-3/4">
                                <h4 className="font-bold mb-2">Event Title {event}</h4>
                                <p className="text-sm mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar size={16} className="mr-2" />
                                    <span>Date: DD/MM/YYYY</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Donation Form and Info Section */}
            <div className="flex p-8 bg-gray-100">
                <div className="w-1/2 pr-4">
                    <h2 className="text-2xl font-bold mb-4">Make your donation</h2>
                    <form className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex mb-4">
                            {['$10', '$20', '$50', '$100', '$500'].map((amount) => (
                                <button key={amount} className="flex-1 bg-gray-200 hover:bg-orange-500 hover:text-white py-2 mx-1 rounded">
                                    {amount}
                                </button>
                            ))}
                        </div>
                        <input type="text" placeholder="Other Amount" className="w-full p-2 mb-4 border rounded" />
                        <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded" />
                        <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" />
                        <button className="w-full bg-orange-500 text-white py-2 rounded">Donate Now</button>
                    </form>
                </div>
                <div className="w-1/2 pl-4">
                    <h2 className="text-2xl font-bold mb-4">IPSUM DOLOR SIT AMET</h2>
                    <p className="text-sm mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded">Read More</button>
                </div>
            </div>

            {/* Footer Sections */}
            <div className="flex p-8 bg-gray-800 text-white">
                <div className="w-1/3 pr-4">
                    <h3 className="font-bold text-xl mb-4">Start Helping Campaign</h3>
                    <p className="text-sm mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className="w-1/3 px-4">
                    <h3 className="font-bold text-xl mb-4">We Need Volunteers</h3>
                    <p className="text-sm mb-4">
                        Our organization relies on the dedication and commitment of volunteers to make a difference.
                    </p>
                </div>
                <div className="w-1/3 pl-4">
                    <img src="/api/placeholder/300/200" alt="Volunteer" className="w-full rounded mb-4" />
                </div>
            </div>

            {/* Call to Action */}
            <div className="relative h-64 bg-gray-300">
                <img src="/api/placeholder/1200/300" alt="Volunteers" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Anyone Can Be A Volunteer, Also You</h2>
                    <button className="bg-orange-500 text-white px-6 py-2 rounded">BECOME A VOLUNTEER</button>
                </div>
            </div>
        </div>
    );
};

export default CampaignPage;

