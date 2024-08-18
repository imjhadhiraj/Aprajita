import { useState, useEffect } from 'react'
import useAdmin from '../../store/useAdmin'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { LogOut, Menu, X } from 'lucide-react'

const DashboardLayout = () => {
    const user = useAdmin((state) => state.user)
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        document.title = 'Admin Dashboard'
        if (user.length === 0) {
            navigate('/admin')
        }
    }, []);

    const handleSignOut = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/logout`, { withCredentials: true })
            if (res.status === 200) {
                toast.success(res?.message)
                navigate("/admin")
            }
            else {
                toast.error(res?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div>
            <Toaster />
            <div className="flex h-screen">
                <button
                    className="md:hidden fixed top-4 left-4 z-20 p-2 bg-orange-500 rounded"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>

                <nav className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static w-64 h-full bg-gradient-to-b from-[#FDC830] to-[#F37335] p-4 shadow-lg rounded-r-xl transition-transform duration-300 ease-in-out z-10`}>
                    <div className="flex flex-col items-center mb-6">
                        <img src={`${user?.user?.profileImg ? user.user.profileImg : 'defaultlogo.png'}`} alt="User" className="w-14 h-14 rounded-full mr-3 mb-1" />
                        <span className="mx-auto">Welcome back,<br />
                            <span className='mx-auto font-semibold'>{user?.user?.name.substr(0, 15)}</span>
                        </span>
                    </div>
                    <ul className="space-y-2 flex flex-col justify-between h-[calc(100%-8rem)]">
                        <div>
                            <li><NavLink to="/admin-dashboard/gallery" className="flex items-center p-2 hover:bg-[#ea9633] rounded" onClick={() => setIsSidebarOpen(false)}>Gallery</NavLink></li>
                            <li><NavLink to="/admin-dashboard/events" className="flex items-center p-2 hover:bg-[#ea9633] rounded" onClick={() => setIsSidebarOpen(false)}>Events</NavLink></li>
                        </div>
                        <li>
                            <button className="w-full mt-4 p-2 text-left hover:bg-gray-100 rounded flex items-center"
                                onClick={handleSignOut}>
                                <LogOut className="mr-2" /> Sign Out
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="flex-1 p-4 md:p-8 gallery-scroll-area scrollbar-thin-main overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout