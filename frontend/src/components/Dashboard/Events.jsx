import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CalendarIcon, MapPinIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const Events = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [photo, setPhoto] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-events`);
            setEvents(response.data);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred while fetching events.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('location', location);
        formData.append('eventImg', photo);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/add-event`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                setIsModalOpen(false);
                await fetchEvents();
            } else {
                toast.error('Failed to add event.');
            }
        } catch (error) {
            console.log(error)
            toast.error('An error occurred while adding the event.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteEvent = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/delete-event/${id}`, {
                withCredentials: true,
            });
            toast.success(response.data.message);
            await fetchEvents();
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred while deleting the event.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Events</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add New Event
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
                                    <p className="text-gray-600 mb-4">{event.description}</p>
                                    <div className="flex items-center text-gray-500 mb-2">
                                        <CalendarIcon className="h-5 w-5 mr-2" />
                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 mb-4">
                                        <MapPinIcon className="h-5 w-5 mr-2" />
                                        <span>{event.location}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteEvent(event._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out"
                                    >
                                        <TrashIcon className="h-5 w-5 mr-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Event</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Event Title"
                                    className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Event Description"
                                    className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Event Location"
                                    className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="file"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    className="w-full mb-6"
                                    required
                                />
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                                    >
                                        Add Event
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;