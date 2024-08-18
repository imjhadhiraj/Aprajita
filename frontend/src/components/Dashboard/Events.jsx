import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '../Loader'; // Assuming you have a Loader component

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
    }, [])

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-events`)
            console.log(response.data)
            setEvents(response.data);
        } catch (error) {
            // console.error('Error fetching events:', error);
            toast.error(error.response?.data?.error || 'An error occurred while fetching events.');
        }
        finally {
            setIsLoading(false);
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
        setDate('');
        setPhoto(null);
    };

    const handleFileChange = (event) => {
        setPhoto(event.target.files[0]);
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
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                closeModal();
                await fetchEvents();
            } else {
                toast.error('Failed to add event.');
            }
        } catch (error) {
            console.error('Error adding event:', error);
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
            // console.error('Error deleting event:', error);
            toast.error(error.response?.data?.error || 'An error occurred while deleting the event.');
        }
        finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="text-center mt-8"><Loader /></div>;

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className="text-3xl font-bold mb-6">Events</h1>
            <button
                className="mb-6 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12"
                onClick={openModal}>
                Add new Event
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <div key={event._id} className="bg-white p-4 rounded-lg shadow-lg">
                        <img src={event.image} alt={event.title} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                        <p className="text-gray-600 mb-2">{event.description}</p>
                        <p className="text-gray-600 mb-2">{new Date(event.date).toDateString()}</p>
                        <p className="text-gray-600 mb-2">{event.location}</p>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteEvent(event._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add New Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                                    Photo
                                </label>
                                <input
                                    type="file"
                                    id="photo"
                                    onChange={handleFileChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;