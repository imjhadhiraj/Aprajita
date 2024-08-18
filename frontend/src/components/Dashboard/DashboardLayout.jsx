import { useEffect } from 'react'
import useAdmin from '../../store/useAdmin'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { LogOut } from 'lucide-react'

const DashboardLayout = () => {
    const user = useAdmin((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Admin Dashboard'
        // console.log(user)
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

    return (
        <div>
            <Toaster />
            <div className="flex h-screen bg-gradient-to-b">
                <nav className="w-64 bg-gradient-to-b from-[#FDC830] to-[#F37335] p-4 shadow-lg rounded-r-xl ">
                    <div className="flex items-center mb-6">
                        <img src={`${user?.user?.profileImg ? user.user.profileImg : 'defaultlogo.png'}`} alt="User" className="w-10 h-10 rounded-full mr-3" />
                        <span className="font-semibold">Welcome back,<br />{user?.user?.name}</span>
                    </div>
                    <ul className="space-y-2 flex flex-col  justify-between">
                        <div>
                            <li><NavLink to="/admin-dashboard/gallery" className="flex items-center p-2 hover:bg-[#ea9633] rounded">Gallery</NavLink></li>
                            <li><NavLink to="/admin-dashboard/events" className="flex items-center p-2 hover:bg-[#ea9633] rounded">Events</NavLink></li>
                        </div>
                        <li><div className="mt-auto absolute font-bold bottom-6">
                            <button className="w-full mt-4 p-2 text-left hover:bg-gray-100 rounded flex items-center"
                                onClick={handleSignOut}>
                                <LogOut className="mr-2" /> Sign Out
                            </button>
                        </div></li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout
