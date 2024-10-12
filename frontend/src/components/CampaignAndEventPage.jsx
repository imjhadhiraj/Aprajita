import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Donation from './Donation';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Events from './Events';

const campaignContent = [
    {
        title: 'Next Event',
        description: 'Join us for our upcoming event where we will discuss groundbreaking initiatives in our community. Don’t miss out on this opportunity to engage and contribute!',
    },
    {
        title: 'Next Workshop',
        description: 'Participate in our next workshop to gain hands-on experience and valuable skills. Our workshops are designed to empower and educate.',
    },
    {
        title: 'Next Campaign',
        description: 'Be part of our latest campaign aimed at driving positive change. Get involved and help us make a significant impact through your support.',
    },
];

const CampaignPage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const handleVolunteer = (e) => {
        e.preventDefault();
        toast.success('Thank you for volunteering! We will get in touch with you soon.');
        closeModal();
    }


    return (
        <div className="font-sans">
            {/* Campaign Cards */}
            <div id='campaign' className="flex md:justify-between gap-2 p-8 bg-orange-100 flex-wrap md:flex-nowrap">
                {campaignContent.map((item, index) => (
                    <div key={index} className=" bg-white p-4 rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-orange-500 rounded-full mb-4 flex items-center justify-center text-white">
                            <ArrowRight />
                        </div>
                        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-sm mb-4">{item.description}</p>
                        <Link to='ReadMore' className="bg-orange-500 text-white px-4 py-2 rounded">Read More</Link>
                    </div>
                ))}
            </div>
            <Events />
            <Donation />
            <div className="relative h-64 bg-gray-300">
                <img src="volunteer.jpeg" alt="Volunteers" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Anyone Can Be A Volunteer, Also You</h2>
                    <button onClick={openModal} className="bg-orange-500 text-white px-6 py-2 rounded">BECOME A VOLUNTEER</button>
                </div>
            </div>
            {modalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Become a Volunteer</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleVolunteer}>
                        <input type="text" required placeholder="Full Name" className="border p-2 rounded" />
                        <input type="email" required placeholder="Email" className="border p-2 rounded" />
                        <input type="tel" required placeholder="Phone" className="border p-2 rounded" />
                        <div className='flex justify-between'>
                            <button onClick={closeModal} className="bg-black text-white px-4 py-2 rounded">Cancel</button>
                            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            }
        </div>
    );
};

export default CampaignPage;
