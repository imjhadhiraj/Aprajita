import axios from 'axios';
import { Calendar, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Events = () => {
    const [latestEvents, setLatestEvents] = useState([]);
    const [allEvents, setAllEvents] = useState(false);

    const fetchLatestEvents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-events`);
            setLatestEvents(response.data);
            setAllEvents(false);
        } catch (error) {
            console.error('Error fetching latest events:', error);
        }
    }

    const fetchAllEvents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-events`);
            setLatestEvents(response.data);
            setAllEvents(true);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred while fetching events.');
        }
    }

    useEffect(() => {
        fetchLatestEvents();
    }, [])

    const isNewEvent = (eventDate) => {
        const now = new Date();
        const eventDateTime = new Date(eventDate);
        const diffTime = Math.abs(now - eventDateTime);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
    }

    return (
        <div id='events' className="p-8">
            <h2 className="text-2xl font-bold mb-4">Latest Events</h2>
            <div className="flex flex-wrap">
                {latestEvents.map((event) => (
                    <div key={event._id} className="w-full md:w-1/3 p-2">
                        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col relative">
                            {isNewEvent(event.date) && (
                                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg z-10">
                                    New
                                </div>
                            )}
                            <div className="h-48 mb-4">
                                <img src={event.image} alt={`Event ${event.title}`} className="w-full h-full object-cover rounded" />
                            </div>
                            <h4 className="font-bold mb-2">{event.title}</h4>
                            <p className="text-sm mb-2">{event.description}</p>
                            <div className="flex items-center text-sm text-gray-600 justify-between">
                                <div className="flex items-center">
                                    <Calendar size={16} className="mr-2" />
                                    <span>Date: {new Date(event.date).toLocaleDateString('en-GB')}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin size={16} className="mr-2" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!allEvents ? (
                <button
                    className="text-blue-500 px-4 py-2 rounded mt-4 cursor-pointer font-semibold block mx-auto"
                    onClick={fetchAllEvents}>
                    See All Events
                </button>
            ) : (
                <button
                    className="text-blue-500 px-4 py-2 rounded mt-4 cursor-pointer font-semibold block mx-auto"
                    onClick={fetchLatestEvents}>
                    See Fewer Events
                </button>
            )}
        </div>
    )
}

export default Events;