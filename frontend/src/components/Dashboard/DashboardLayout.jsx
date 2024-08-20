import { useState, useEffect } from 'react'
import useAdmin from '../../store/useAdmin'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Image, Calendar, Users, UserPlus, LogOut, Menu, X } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const DashboardLayout = () => {
    const user = useAdmin((state) => state.user)
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false)

    useEffect(() => {
        document.title = 'Admin Dashboard'
        if (user.length === 0) {
            navigate('/admin')
        }
    }, [])

    const handleSignOut = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/logout`, {}, { withCredentials: true })
            if (res.status === 200) {
                toast.success(res?.data?.message || 'Signed out successfully')
                navigate("/admin")
            } else {
                toast.error(res?.data?.message || 'Sign out failed')
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
        finally {
            closeSignOutModal()
        }
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
    const openSignOutModal = () => setIsSignOutModalOpen(true)
    const closeSignOutModal = () => setIsSignOutModalOpen(false)

    const navItems = [
        { to: "/admin-dashboard/gallery", icon: Image, label: "Gallery" },
        { to: "/admin-dashboard/events", icon: Calendar, label: "Events" },
        { to: "/admin-dashboard/team", icon: Users, label: "Team Members" },
        { to: "/admin-dashboard/register-admin", icon: UserPlus, label: "Register new Admin" },
    ]

    return (
        <div className="flex h-screen bg-gray-100">
            <Toaster />
            <button
                className="md:hidden fixed top-4 left-4 z-20 p-2 bg-orange-500 text-white rounded-full shadow-lg"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 fixed md:static w-64 h-full bg-gradient-to-b from-[#FDC830] to-[#F37335] p-6 shadow-xl rounded-r-3xl transition-transform duration-300 ease-in-out z-10`}>
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={user?.user?.profileImg || 'defaultlogo.png'}
                        alt="User"
                        className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow-md"
                    />
                    <span className="text-center text-white">
                        Welcome back,<br />
                        <span className='font-semibold text-lg'>{user?.user?.name?.substr(0, 20)}</span>
                    </span>
                </div>
                <ul className="space-y-4">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => `
                                    flex items-center p-3 rounded-lg transition-colors duration-200
                                    ${isActive ? 'bg-white text-orange-500' : 'text-white hover:bg-white/20'}
                                `}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <item.icon className="mr-3" size={20} />
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <button
                    className="w-full mt-8 p-3 bg-white text-orange-500 rounded-lg shadow flex items-center justify-center hover:bg-orange-50 transition-colors duration-200"
                    onClick={openSignOutModal}
                >
                    <LogOut className="mr-2" size={20} /> Sign Out
                </button>
            </nav>

            <div className="flex-1 p-8 overflow-y-auto gallery-scroll-area scrollbar-thin-main h-screen">
                <Outlet />
            </div>

            {isSignOutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Confirm Sign Out</h2>
                        <p className="mb-6">Are you sure you want to sign out?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200"
                                onClick={closeSignOutModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout