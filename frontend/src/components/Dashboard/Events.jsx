import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import uploadToCloud from '../../utils/uploadToCloud';
import { Calendar, Edit, MapPin, Plus, Trash } from 'lucide-react';

const Events = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [photo, setPhoto] = useState(null);
    const [events, setEvents] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editEventId, setEditEventId] = useState('');
    const [editImgSrc, setEditImgSrc] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');


    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        toast.loading('Fetching events...');
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-events`);
            setEvents(response.data);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred while fetching events.');
        } finally {
            toast.dismiss();
            setIsLoading(false);
        }
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
        setPhoto(null);
        setIsEditing(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        toast.loading('Please wait...');
        try {
            if (isEditing) {
                try {
                    let imageUrl = editImgSrc;
                    if (photo) {
                        imageUrl = await uploadToCloud(photo);
                        if (!imageUrl) {
                            throw new Error('Failed to upload image');
                        }

                    }
                    const eventData = {
                        title,
                        description,
                        date,
                        location,
                        image: imageUrl // Use the Cloudinary URL
                    };
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/update-event/${editEventId}`, eventData, {
                        withCredentials: true,
                    });

                    toast.dismiss();
                    if (response.status === 200) {
                        toast.success(response.data.message);
                        await fetchEvents();
                    } else {
                        toast.error('Failed to update event.');
                    }
                } catch (error) {
                    toast.dismiss();
                    toast.error(error.response?.data?.error || 'An error occurred while updating the event.');
                }
                finally {
                    setIsLoading(false);
                    setIsEditing(false);
                    setIsModalOpen(false);
                    setTitle('');
                    setDescription('');
                    setDate('');
                    setLocation('');
                    setPhoto(null);
                }
                return;
            }
            const imageUrl = await uploadToCloud(photo);

            if (!imageUrl) {
                throw new Error('Failed to upload image');
            }

            const eventData = {
                title,
                description,
                date,
                location,
                image: imageUrl // Use the Cloudinary URL
            };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/add-event`, eventData, {
                withCredentials: true,
            });
            toast.dismiss();
            if (response.status === 200) {
                toast.success(response.data.message);
                setIsModalOpen(false);
                await fetchEvents();
            } else {
                toast.error('Failed to add event.');
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response?.data?.error || 'An error occurred while adding the event.');
        } finally {
            setIsLoading(false);
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setPhoto(null);
        }
    };

    const handleEditEvent = (id) => {
        setIsEditing(true);
        setEditEventId(id);
        const event = events.find((event) => event._id === id);
        setTitle(event.title);
        setDescription(event.description);
        const date = new Date(event.date);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setDate(formattedDate);
        setLocation(event.location);
        setIsModalOpen(true);
        setEditImgSrc(event.image);
    }

    const handleDeleteEvent = async (id) => {
        setIsLoading(true);
        toast.loading('Deleting event...');
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/delete-event/${id}`, {
                withCredentials: true,
            });
            toast.dismiss();
            toast.success(response.data.message);
            await fetchEvents();
        } catch (error) {
            toast.dismiss();
            toast.error(error.response?.data?.error || 'An error occurred while deleting the event.');
        } finally {
            setIsLoading(false);
            setDeleteModal(false);
        }
    };

    const openDeleteModal = (id) => {
        setDeleteModal(true);
        setDeleteId(id);
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Events</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <Plus className="h-5 w-5 mr-2" />
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
                                        <Calendar className="h-5 w-5 mr-2" />
                                        <span>{new Date(event.date).toLocaleDateString('en-GB')}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 mb-4">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            className="bg-black flex hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg mr-2 transition duration-300 ease-in-out"
                                            onClick={() => handleEditEvent(event._id)}
                                        >
                                            <Edit className="h-5 w-5 mr-2" />
                                            Edit</button>
                                        <button
                                            onClick={() => openDeleteModal(event._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out"
                                        >
                                            <Trash className="h-5 w-5 mr-2" />
                                            Delete
                                        </button></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">{isEditing ? "Edit" : "Add New"} Event</h2>
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
                                {
                                    !isEditing ? (
                                        <input
                                            type="file"
                                            onChange={(e) => setPhoto(e.target.files[0])}
                                            className="w-full mb-6"
                                            required
                                        />) : (<div className='flex gap-2'>
                                            <img className='h-12 w-12 rounded-full' src={editImgSrc} alt="eventImg" />
                                            <input
                                                type="file"
                                                onChange={(e) => setPhoto(e.target.files[0])}
                                                className="w-full mb-6"
                                            />
                                        </div>)
                                }
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                                    >
                                        Cancel
                                    </button>
                                    {isEditing ? (<button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                                    >
                                        Edit Event
                                    </button>) : (<button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                                    >
                                        Add Event
                                    </button>)}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {deleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Delete Event</h2>
                            <p className="text-gray-600 mb-6">Are you sure you want to delete this event?</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setDeleteModal(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteEvent(deleteId)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {
                    events.length === 0 && !isLoading && (
                        <div className="text-center text-gray-600 mt-8">
                            <h2 className="text-2xl font-bold mb-4">No events found</h2>
                            <p className="text-lg">There are no events available. Please add new events.</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Events;