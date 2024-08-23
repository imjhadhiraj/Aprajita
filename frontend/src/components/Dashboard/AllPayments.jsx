import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { X } from "lucide-react"

const AllPayments = () => {

    const [payments, setPayments] = useState([])
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)
    const [paymentIdData, setPaymentIdData] = useState([])

    const fetchPaymentId = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-payment-data/${id}`)
            console.log(response.data.payment)
            setPaymentIdData(response.data.payment)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
            console.error(error)
        }
    }

    const fetchAllPaymets = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-payment-data`, {
                withCredentials: true
            })

            // console.log(response.data.payments)
            setPayments(response.data?.payments)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
            console.error(error)
        }
    }


    useEffect(() => {
        fetchAllPaymets();
    }, [])

    return (
        <div>
            <h3 className="text-2xl font-semibold text-gray-800 m-4">All Payments</h3>
            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Name</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Email</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Amount</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Date</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Phone</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Payment ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment) => (
                                <tr
                                    onClick={() => {
                                        setPaymentModalOpen(true)
                                        fetchPaymentId(payment.razorpay_payment_id)
                                    }}
                                    key={payment._id}
                                    className="hover:bg-gray-300 cursor-pointer">
                                    <td className="text-left py-3 px-4">{payment.name}</td>
                                    <td className="text-left py-3 px-4">{payment.email}</td>
                                    <td className="text-left py-3 px-4">{payment.amount}</td>
                                    <td className="text-left py-3 px-4">{payment.date}</td>
                                    <td className="text-left py-3 px-4">{payment.phone}</td>
                                    <td className="text-left py-3 px-4">{payment.razorpay_payment_id}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {paymentModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg w-[90%] md:w-1/2">
                            <div className="flex justify-between">
                                <h3 className="text-2xl font-semibold text-gray-800">Payment Details</h3>
                                <button onClick={() => setPaymentModalOpen(false)} className="top-4 right-4 text-gray-500">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="mt-4 overflow-x-auto">
                                {/* <p><strong>ID: </strong> {paymentIdData._id}</p> */}
                                <p><strong>Name: </strong> {paymentIdData.name}</p>
                                <p><strong>Email: </strong> {paymentIdData.email}</p>
                                <p><strong>Amount: </strong> {paymentIdData.amount}</p>
                                <p><strong>Date: </strong> {new Date(paymentIdData.date).toLocaleString()}</p>
                                <p><strong>Phone: </strong> {paymentIdData.phone}</p>
                                <p><strong>Payment ID: </strong> {paymentIdData.razorpay_payment_id}</p>
                                <p><strong>Order ID: </strong> {paymentIdData.razorpay_order_id}</p>
                                <p><strong>Signature: </strong> {paymentIdData.razorpay_signature}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllPayments
