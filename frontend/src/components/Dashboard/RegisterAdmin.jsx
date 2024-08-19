import { useState } from 'react';
import axios from 'axios';
import uploadToCloud from '../utils/uploadToCloud';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, Image } from 'lucide-react';

const RegisterAdmin = () => {
    const [adminData, setAdminData] = useState({
        name: '',
        email: '',
        password: '',
        profileImg: null
    });
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAdminData({ ...adminData, profileImg: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let profileImgUrl = null;
            if (adminData.profileImg) {
                profileImgUrl = await uploadToCloud(adminData.profileImg);
            }

            const adminDataToSend = {
                name: adminData.name,
                email: adminData.email,
                password: adminData.password,
                profileImg: profileImgUrl
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/register-admin`,
                adminDataToSend,
                { withCredentials: true }
            );

            toast.success(response.data.message);
            setAdminData({ name: '', email: '', password: '', profileImg: null });
            setPreviewImage(null);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Registering Admin</h2>
                    <div className="flex justify-center items-center space-x-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-700"></div>
                        <span className="text-lg text-gray-700">Processing...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Register New Admin</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={adminData.name}
                                onChange={handleChange}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={adminData.email}
                                onChange={handleChange}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={adminData.password}
                                onChange={handleChange}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="profileImg" className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                {previewImage ? (
                                    <img src={previewImage} alt="Profile Preview" className="h-20 w-20 rounded-full object-cover" />
                                ) : (
                                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Image className="text-gray-400" size={32} />
                                    </div>
                                )}
                            </div>
                            <label htmlFor="profileImg" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Choose File
                                <input
                                    type="file"
                                    id="profileImg"
                                    name="profileImg"
                                    onChange={handleImageChange}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                        Register Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterAdmin;