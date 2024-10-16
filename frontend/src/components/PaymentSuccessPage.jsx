import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Download, Share } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const PaymentSuccessPage = () => {
    const { razorpay_payment_id } = useParams()
    const [paymentData, setPaymentData] = useState({});
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const navigate = useNavigate();
    const location = useLocation();
    const currentUrl = window.location.origin + location.pathname + location.search;
    const [errorPayment, setErrorPayment] = useState(false);

    const fetchPaymentSuccessData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-payment-data/${razorpay_payment_id}`);

            if (res.status === 200) {
                setPaymentData(res.data.payment);
            }
            else {
                toast.error('Invalid payment request');
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast.error('Invalid payment request');
            setErrorPayment(true);
        }
    }

    const goToHomePage = () => {
        navigate('/');
    }

    useEffect(() => {
        fetchPaymentSuccessData();
    }, [])

    const handleDownload = () => {
        const element = document.getElementById('element-to-print');
        const opt = {
            margin: 1,
            filename: 'receipt.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    if (errorPayment) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-red-500 p-4">
                <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg text-center w-full max-w-md">
                    <div className="flex gap-2 justify-center items-center">
                        <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 mb-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12" y2="16"></line>
                        </svg>
                        <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Invalid Payment Id</h2>
                    </div>
                    <p className="text-gray-700 mb-4">Invalid payment details. Please try again.</p>
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
                        onClick={() => navigate('/')}
                    >
                        Go to Home Page
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-green-500 p-4">
            <Toaster />
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-2xl">
                <div id="element-to-print" className="mb-6">
                    <div className="flex items-center justify-center mb-6">
                        <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mr-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span className="text-2xl sm:text-3xl font-bold text-gray-800">Payment Successful</span>
                    </div>
                    <div className="bg-yellow-100 p-4 sm:p-5 rounded-lg mb-6">
                        <div className="flex gap-4 items-center">
                            <img className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" src="/logo.jpg" alt="Logo" />
                            <span className="font-bold text-base sm:text-lg text-gray-800">Aprajata Foundation</span>
                        </div>
                        <p className="mt-3 text-gray-700">Thank You! For your Donation</p>
                    </div>
                    <div className="mb-6">
                        <p className="font-bold text-lg text-gray-800 mb-3">Bill Details</p>
                        <div className="flex flex-col sm:flex-row justify-between text-gray-700">
                            <span>Customer Name:</span>
                            <span className="font-semibold">{paymentData.name}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between text-gray-700">
                            <span>Customer Email:</span>
                            <span className="font-semibold break-all">{paymentData.email}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between text-gray-700">
                            <span>Date:</span>
                            <span className="font-semibold">{new Date(paymentData.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between text-gray-700">
                            <span>Phone No.:</span>
                            <span className="font-semibold">{paymentData.phone}</span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <p className="font-bold text-lg text-gray-800 mb-3">Payment Details</p>
                        <div className="flex flex-col sm:flex-row justify-between text-gray-700">
                            <span>Transaction Time:</span>
                            <span className="font-semibold">{new Date(paymentData.date).toLocaleTimeString('en-US', options)}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between text-gray-700">
                            <span>Order ID:</span>
                            <span className="font-semibold break-all">{paymentData.razorpay_order_id}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between text-gray-700">
                            <span>Transaction ID:</span>
                            <span className="font-semibold break-all">{paymentData.razorpay_payment_id}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between text-gray-700">
                            <span>Amount:</span>
                            <span className="font-semibold">{paymentData.amount}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                        onClick={handleDownload}
                    >
                        <Download className="mr-2" /> Download
                    </button>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                        onClick={() => {
                            navigator.clipboard.writeText(currentUrl);
                            toast.success('Link copied to clipboard');
                        }}
                    >
                        <Share className="mr-2" /> Share Receipt
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 w-full sm:w-auto"
                        onClick={goToHomePage}
                    >
                        Go to Home Page
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccessPage;