import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import uploadToCloud from '../../utils/uploadToCloud';
import { Edit2Icon, Facebook, Instagram, Linkedin, Trash2Icon, Twitter } from 'lucide-react';

const TeamMember = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        profileImg: null,
        quote: '',
        description: '',
        socials: {
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: '',
        },
    });

    const [editId, setEditId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const [imageToDelete, setImageToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-team-members`);
            setMembers(response.data);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred while fetching Members.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (editMode) {
                try {
                    let imageUrl = formData.profileImg;
                    if (formData.profileImg instanceof File) {
                        toast.loading('Uploading Image...');
                        imageUrl = await uploadToCloud(formData.profileImg);
                        if (!imageUrl) {
                            throw new Error('Failed to upload image');
                        }
                    }

                    const memberData = {
                        name: formData.name,
                        position: formData.position,
                        quote: formData.quote,
                        description: formData.description,
                        image: imageUrl,
                        socials: JSON.stringify(formData.socials),
                    };
                    toast.loading('Updating Member...');
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/update-team-member/${editId}`, memberData, {
                        withCredentials: true,
                    });
                    toast.dismiss();
                    if (response.status === 200) {
                        toast.success(response.data.message);
                        setIsModalOpen(false);
                        await fetchMembers();
                    }
                } catch (error) {
                    toast.dismiss();
                    toast.error(error.response?.data?.error || 'An error occurred while updating the member.');
                }
                finally {
                    setIsLoading(false);
                    setFormData({
                        name: '',
                        position: '',
                        profileImg: null,
                        quote: '',
                        description: '',
                        socials: {
                            twitter: '',
                            facebook: '',
                            instagram: '',
                            linkedin: '',
                        },
                    })
                    setEditMode(false);
                }
                return;
            }
            toast.loading('Uploading Image...');
            const imageUrl = await uploadToCloud(formData.profileImg);

            if (!imageUrl) {
                throw new Error('Failed to upload image');
            }

            const memberData = {
                name: formData.name,
                position: formData.position,
                quote: formData.quote,
                description: formData.description,
                image: imageUrl,
                socials: JSON.stringify(formData.socials),
            };
            toast.loading('Adding Member...');
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/add-team-member`,
                memberData,
                {
                    withCredentials: true,
                }
            );
            toast.dismiss();
            if (response.status === 200) {
                toast.success(response.data.message);
                setIsModalOpen(false);
                await fetchMembers();
            } else {
                toast.error('Failed to add Member.');
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response?.data?.error || 'An error occurred while adding the member.');
            await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/delete-cloudinary-image`, {
                headers: {
                    url: formData.profileImg
                },
                withCredentials: true,
            });
        } finally {
            setIsLoading(false);
            setFormData({
                name: '',
                position: '',
                profileImg: null,
                quote: '',
                description: '',
                socials: {
                    twitter: '',
                    facebook: '',
                    instagram: '',
                    linkedin: '',
                },
            });

        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditMode(false);
        setFormData({
            name: '',
            position: '',
            profileImg: null,
            quote: '',
            description: '',
            socials: {
                twitter: '',
                facebook: '',
                instagram: '',
                linkedin: '',
            },
        });
    };

    const handleUpdateMember = (id) => {
        setEditId(id);
        const member = members.find((member) => member._id === id);
        // console.log(typeof (member.socials)) // object
        setImageSrc(member.image);
        setFormData({
            name: member.name,
            position: member.position,
            profileImg: member.image,
            quote: member.quote,
            description: member.description,
            socials: member.socials,
        });

        setIsModalOpen(true);
        setEditMode(true);
    }

    const handleDeleteMember = async (id) => {
        setIsLoading(true);
        toast.loading('Deleting Member...');
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/delete-team-member/${id}`, {
                withCredentials: true,
            });
            toast.dismiss();
            toast.success(response.data.message);
            await fetchMembers();
        } catch (error) {
            toast.dismiss();
            toast.error(error.response?.data?.error || 'An error occurred while deleting the member.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Team Members</h1>
            <button
                className="mb-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                onClick={() => setIsModalOpen(true)}
            >
                Add New Member
            </button>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member) => (
                        <div key={member._id} className="bg-white shadow-xl rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            <img className="w-full h-64 object-cover" src={member.image} alt={member.name} />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h2>
                                <p className="text-gray-600 mb-4">{member.position}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-4">
                                        {member.socials?.twitter && (
                                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                                                <Twitter className="text-blue-400 hover:text-blue-600" />
                                            </a>
                                        )}
                                        {member.socials?.linkedin && (
                                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                                <Linkedin className="text-blue-700 hover:text-blue-900" />
                                            </a>
                                        )}
                                        {member.socials?.facebook && (
                                            <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer">
                                                <Facebook className="text-blue-600 hover:text-blue-800" />
                                            </a>
                                        )}
                                        {member.socials?.instagram && (
                                            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
                                                <Instagram className="text-pink-600 hover:text-pink-800" />
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex gap-2'
                                            onClick={() => handleUpdateMember(member._id)}
                                        >
                                            <Edit2Icon className="w-6 h-6" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setImageToDelete(member._id);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex gap-2"
                                        >
                                            <Trash2Icon className="w-6 h-6" />
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">{editMode ? "Edit" : "Add new"} Member</h2>
                        <form onSubmit={handleSubmit} className='max-h-[70vh] overflow-y-auto gallery-scroll-area scrollbar-thin h-screen'>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Name"
                                className="w-[90%] ml-2 mt-2 h-12 border border-gray-300 rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                placeholder="Position"
                                className="w-[90%] h-12 border border-gray-300 ml-2 rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {editMode ? (<div className='flex'>
                                <img src={imageSrc} alt={formData.name} className="w-12 h-12 object-cover rounded-lg ml-2 mb-4" />
                                <input
                                    type="file"
                                    onChange={(e) => setFormData({ ...formData, profileImg: e.target.files[0] })}
                                    accept="image/*"
                                    className="w-[90%] mb-4 ml-2"
                                />
                            </div>) : (<input
                                type="file"
                                onChange={(e) => setFormData({ ...formData, profileImg: e.target.files[0] })}
                                accept="image/*"
                                className="w-[90%] mb-4 ml-2"
                                required
                            />)}
                            <input
                                type="text"
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                placeholder="Quote"
                                className="w-[90%] h-12 border border-gray-300 ml-2 rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Description"
                                className="w-[90%] h-32 ml-2 border border-gray-300 rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                                <input
                                    key={social}
                                    type="text"
                                    value={formData.socials[social]}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        socials: { ...formData.socials, [social]: e.target.value }
                                    })}
                                    placeholder={`${social.charAt(0).toUpperCase() + social.slice(1)} URL`}
                                    className="w-[90%] h-12 border border-gray-300 ml-2 rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ))}
                            <div className="flex justify-end space-x-4 mr-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                                >
                                    Cancel
                                </button>
                                {
                                    editMode ? (
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                                        >
                                            Update Member
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                                        >
                                            Add Member
                                        </button>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Delete Member</h2>
                        <p className="text-gray-600 mb-4">Are you sure you want to delete this member?</p>
                        <div className="flex justify-end space-x-4 mr-3">
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleDeleteMember(imageToDelete);
                                    setIsDeleteModalOpen(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                            >
                                Delete Member
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamMember;