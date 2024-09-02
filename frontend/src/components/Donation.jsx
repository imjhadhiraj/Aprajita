import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';

const Donation = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        name: '',
        email: '',
        phone: '',
        amount: '',
    });
    let rzp_id = null;

    const navigate = useNavigate();

    const checkoutHandler = async (e) => {
        e.preventDefault();
        try {
            if (!paymentDetails.amount || !paymentDetails.name || !paymentDetails.email || !paymentDetails.phone) {
                toast.error('Please fill all the fields');
                return;
            }

            if (paymentDetails.amount < 1) {
                toast.error('Amount should be greater than 0');
                return;
            }

            if (paymentDetails.phone.length !== 10) {
                toast.error('Phone number should be 10 digits');
                return;
            }

            if (!window.Razorpay) {
                throw new Error('Razorpay SDK not loaded');
            }

            const key = import.meta.env.VITE_RAZORPAY_API_KEY;
            toast.loading('Creating order...');
            const orderResponse = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/create-payment`, {
                amount: paymentDetails.amount
            });
            toast.dismiss();
            if (orderResponse.status !== 200) {
                toast.error('Something went wrong');
                return;
            }

            const order = orderResponse.data.order;
            const options = {
                key: key,
                amount: order.amount,
                currency: "INR",
                name: "Aprajita Foundation",
                description: "Donation for a cause",
                image: "https://www.theaprajita.in/logo.jpg",
                order_id: order.id,
                handler: async function (response) {
                    rzp_id = response.razorpay_payment_id;
                    const paymentData = {
                        name: paymentDetails.name,
                        email: paymentDetails.email,
                        amount: paymentDetails.amount,
                        date: new Date(),
                        phone: paymentDetails.phone,
                        // bankRrn: response.bank_rrn_number,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    };
                    toast.loading('Verifying payment...');
                    const paymentRes = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/verify-payment`, paymentData);
                    toast.dismiss();
                    if (paymentRes.status === 200) {
                        navigate(`/payment-success/${rzp_id}`);
                    } else {
                        toast.error('Payment failed');
                    }
                },
                prefill: {
                    name: paymentDetails.name,
                    email: paymentDetails.email,
                    contact: paymentDetails.phone
                },
                notes: {
                    address: "Aprajita Foundation Address"
                },
                theme: {
                    color: "#F37254"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            toast.error(error?.response?.data?.err?.error?.description || 'Something went wrong');
            console.error('Error in checkoutHandler:', error);
        }
    };

    return (
        <>
            <div id="donate" className="flex p-8 bg-gray-100 flex-col-reverse md:flex-row flex-wrap md:flex-nowrap gap-3">
                <div className="w-full md:w-1/2 pr-4">
                    <h2 className="text-2xl font-bold mb-4">Make your donation</h2>
                    <form className="bg-white p-4 rounded-lg shadow-md" onSubmit={(e) => checkoutHandler(e)}>

                        <input
                            type="text"
                            placeholder="Name"
                            value={paymentDetails.name}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                            className="w-full p-2 mb-4 border rounded" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={paymentDetails.email}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, email: e.target.value })}
                            className="w-full p-2 mb-4 border rounded" />

                        <input
                            type="Number"
                            placeholder="Phone"
                            value={paymentDetails.phone}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, phone: e.target.value })}
                            className="w-full p-2 mb-4 border rounded" />


                        <input
                            type="Number"
                            value={paymentDetails.amount}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                            placeholder="Amount"
                            className="w-full p-2 mb-4 border rounded" />

                        <div className="flex mb-4">
                            {['₹100', '₹200', '₹500', '₹1000', '₹2000'].map((amount) => (
                                <button
                                    key={amount}
                                    className="flex-1 bg-gray-200 hover:bg-orange-500 hover:text-white py-2 mx-1 rounded"
                                    onClick={() => setPaymentDetails({ ...paymentDetails, amount: amount.slice(1) })}
                                >
                                    {amount}
                                </button>
                            ))}
                        </div>
                        <button className="w-full bg-orange-500 text-white py-2 rounded" >Donate Now</button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 pl-4">
                    <h2 className="text-2xl font-bold mb-4">Why You Should Donate</h2>
                    <p className="text-sm mb-4">
                        As an NGO, we independently organize all our events and rely solely on our own resources. Your donations are crucial for us to continue our work and make a meaningful impact.
                    </p>
                    <Link to='ReadMore' className="bg-orange-500 text-white px-4 py-2 rounded">Read More</Link>
                </div>
            </div>
        </>
    )
}

export default Donation
