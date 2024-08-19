import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import useAdmin from '../store/useAdmin'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import Loader from './Loader'

const Admin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const setUser = useAdmin((state) => state.setUser);
    const user = useAdmin((state) => state.user);
    const userLoaded = useAdmin((state) => state.userLoaded);
    const loadingUser = useAdmin((state) => state.loadingUser);

    const [submit, setSubmit] = useState(false)

    function onChange() {
        setSubmit(true)
    }

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

    if (!userLoaded) return (
        <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
            <Loader />
        </div>
    )

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8'>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl'>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Admin Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handlesubmit(); }}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <ReCAPTCHA
                        sitekey={`${import.meta.env.VITE_CAPTCHA_SITE_KEY}`}
                        onChange={onChange}
                    />,

                    <div>
                        <button
                            type="submit"
                            disabled={!submit}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Admin
