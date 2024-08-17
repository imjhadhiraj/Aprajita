import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import useAdmin from '../../store/useAdmin'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Admin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const setUser = useAdmin((state) => state.setUser);
    const user = useAdmin((state) => state.user);
    const userLoaded = useAdmin((state) => state.userLoaded);
    const loadingUser = useAdmin((state) => state.loadingUser);

    const checkProfile = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/admin-profile`, {},
            {
                withCredentials: true
            }
        ).then(res => {
            // console.log(res.data)
            setUser(res.data)
            navigate("/admin-dashboard")
        }).catch(e => {
            console.log("profile not found", e)
            // toast.error(e?.response?.data?.error)
        }).finally(() => {
            loadingUser(true)
        })
    }

    useEffect(() => {
        document.title = 'Admin Login'

        // profile page hit
        checkProfile();

        // Check if user is already logged in and redirect to dashboard
        const Myuser = user; // get user from store
        if (Myuser.length > 0) {
            navigate('/admin-dashboard')
        }
    }, [])

    const handlesubmit = async () => {
        const EmailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
        if (!EmailRegex.test(email)) {
            toast.error('Invalid Email')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be atleast 6 characters')
            return
        }

        try {
            const req = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/login-admin`,
                { email, password }, { withCredentials: true }
            )

            if (req.status == 200) {
                toast.success('Login Successful')
                // console.log(req.data)
                setUser(req.data)
                navigate('/admin-dashboard')
            }
            else {
                toast.error('Invalid Credentials')
            }
        } catch (error) {
            // console.log(error)
            toast.error(error?.response?.data?.error)
        }
    }

    if (!userLoaded) return <div className='w-full h-[100vh] flex justify-center items-center'>
        <Loader />
    </div>

    return (
        <div className='bg-gray-700 text-white h-screen p-0'>
            <Toaster
                position="top-right"
                reverseOrder={false} />
            <div className="flex flex-col w-2/3 mx-auto py-5 lg:w-2/4">
                <h2 className="text-lg mb-1 font-medium title-font mx-auto">Login</h2>
                {/* <p className="leading-relaxed mb-5 text-gray-600">Post-ironic portland shabby chic echo park, banjo fashion axe</p> */}
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm">Email <span className='text-red-500'>*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='example@email.com'
                        className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="password" className="leading-7 text-sm ">Password <span className='text-red-500'>*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Password'
                        className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="text-white bg-blue-500 border-0 mb-2 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                    onClick={handlesubmit}
                >Login</button>
            </div>

        </div>
    )
}

export default Admin
