import { Calendar, ArrowRight } from 'lucide-react';

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

const latestEvents = [
    {
        title: 'Akshat 2023',
        date: '15/12/2023',
        description: 'Akshat 2023 was our first event outside Delhi, held in Patna, Bihar. It proved to be a great success and received a positive response in Patna. We are looking forward to hosting more events there.',
        imageUrl: 'Akshat2023.JPG',
    },
    {
        title: 'Anant Samarthya Sampanna',
        date: '24/03/2023',
        description: 'Anant Samarthya Sampanna, an event for Womens Day, was held at ASEAN Hospital. It featured artists from numerous fields and doctors who provided guidance on female health and lifestyle.',
        imageUrl: 'ASS2023.jpg',
    },
    {
        title: 'Akshat 2022',
        date: '03/12/2022',
        description: 'Akshat 2022 featured a session on domestic violence and womens rights, with speakers including advocates from the Delhi High Court and Supreme Court, as well as journalists from various esteemed media outlets.',
        imageUrl: 'Akshat2022.jpg',
    },
];

const CampaignPage = () => {
    return (
        <div className="font-sans">
            {/* Previous sections (top bar, header, navigation) remain the same */}

            {/* Campaign Cards */}
            <div className="flex md:justify-between gap-2 p-8 bg-orange-100 flex-wrap md:flex-nowrap">
                {campaignContent.map((item, index) => (
                    <div key={index} className=" bg-white p-4 rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-orange-500 rounded-full mb-4 flex items-center justify-center text-white">
                            <ArrowRight />
                        </div>
                        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-sm mb-4">{item.description}</p>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded">Read More</button>
                    </div>
                ))}
            </div>

            {/* Latest Events */}
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Latest Events</h2>
                <div className="flex flex-wrap">
                    {latestEvents.map((event, index) => (
                        <div key={index} className="w-full md:w-1/3 p-2">
                            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
                                <div className="h-48 mb-4">
                                    <img src={event.imageUrl} alt={`Event ${event.title}`} className="w-full h-full object-cover rounded" />
                                </div>
                                <h4 className="font-bold mb-2">{event.title}</h4>
                                <p className="text-sm mb-2">{event.description}</p>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar size={16} className="mr-2" />
                                    <span>Date: {event.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Donation Form and Info Section */}
            <div className="flex p-8 bg-gray-100 flex-col-reverse md:flex-row flex-wrap md:flex-nowrap gap-3">
                <div className="w-full md:w-1/2 pr-4">
                    <h2 className="text-2xl font-bold mb-4">Make your donation</h2>
                    <form className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex mb-4">
                            {['₹100', '₹200', '₹500', '₹1000', '₹2000'].map((amount) => (
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
                <div className="w-full md:w-1/2 pl-4">
                    <h2 className="text-2xl font-bold mb-4">Why You Should Donate</h2>
                    <p className="text-sm mb-4">
                        As an NGO, we independently organize all our events and rely solely on our own resources. Your donations are crucial for us to continue our work and make a meaningful impact.
                    </p>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded">Read More</button>
                </div>
            </div>

            {/* Footer Sections */}
            <div className="relative h-64 bg-gray-300">
                <img src="volunteer.jpeg" alt="Volunteers" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Anyone Can Be A Volunteer, Also You</h2>
                    <button className="bg-orange-500 text-white px-6 py-2 rounded">BECOME A VOLUNTEER</button>
                </div>
            </div>
        </div>
    );
};

export default CampaignPage;
