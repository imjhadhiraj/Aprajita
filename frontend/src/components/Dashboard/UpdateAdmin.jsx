import { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Lock, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import useAdmin from "../../store/useAdmin";
import uploadToCloud from "../../utils/uploadToCloud";

const UpdateAdmin = () => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const { user } = useAdmin((state) => state.user)
    const setUser = useAdmin((state) => state.setUser);
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        profileImg: user?.profileImg
    });

    useEffect(() => {
        setFormData({
            name: user?.name,
            email: user?.email,
            profileImg: user?.profileImg
        })
    }, [user])

    const [passwordData, setPasswordData] = useState({
        password: "",
        newPassword: ""
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImg' && files && files[0]) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = {};
            formDataToSend.name = formData.name;
            formDataToSend.email = formData.email;
            let profileImg = formData.profileImg;
            if (formData.profileImg instanceof File) {
                profileImg = await uploadToCloud(formData.profileImg)
                if (!profileImg) {
                    toast.dismiss();
                    toast.error("Failed to upload image");
                    return
                }
            }
            formDataToSend.profileImg = profileImg;

            toast.loading("Updating admin profile...");
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/update-adminProfile`,
                formDataToSend, { withCredentials: true, }
            );
            toast.dismiss();
            if (response.status === 200) {
                toast.success(response?.data?.message);
                setUser(response?.data);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message || "Failed to update admin profile");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            toast.loading("Changing password...");
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/change-password`, passwordData, { withCredentials: true });
            toast.dismiss();
            if (response.status === 200) {
                toast.success(response?.data?.message);
            }
            setIsPasswordModalOpen(false);
        } catch (error) {
            console.log(error)
            toast.dismiss();
            toast.error(error.response?.data?.error || "Failed to change password");
        }
        finally {
            setPasswordData({
                password: "",
                newPassword: ""
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Update Admin Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <User className="absolute top-3 left-3 text-gray-400" size={20} />
                    <input
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Name"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
                    <input
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {formData.profileImg && (
                    <div className="relative w-32 h-32 mx-auto">
                        {
                            (formData.profileImg instanceof File) ? (<img
                                src={URL.createObjectURL(formData.profileImg)}
                                alt="Profile Preview"
                                className="w-full h-full object-cover rounded-full"
                            />) : (<img
                                src={formData?.profileImg}
                                alt="Profile Preview"
                                className="w-full h-full object-cover rounded-full"
                            />)
                        }
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, profileImg: null }))}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
                <div className="relative">
                    <Upload className="absolute top-3 left-3 text-gray-400" size={20} />
                    <input
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        type="file"
                        name="profileImg"
                        onChange={handleInputChange}
                        accept="image/*"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Update Profile
                </button>
            </form>
            <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            >
                Change Password
            </button>
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Change Password</h2>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div className="relative">
                                <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
                                <input
                                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                    type="password"
                                    name="password"
                                    value={passwordData.password}
                                    placeholder="Old Password"
                                    onChange={(e) => {
                                        setPasswordData(prev => ({
                                            ...prev,
                                            password: e.target.value
                                        }))
                                    }}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
                                <input
                                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    placeholder="New Password"
                                    onChange={(e) => {
                                        setPasswordData(prev => ({
                                            ...prev,
                                            newPassword: e.target.value
                                        }))
                                    }}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPasswordData({
                                            password: "",
                                            newPassword: ""
                                        });
                                        setIsPasswordModalOpen(false)
                                    }}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
};

export default UpdateAdmin;