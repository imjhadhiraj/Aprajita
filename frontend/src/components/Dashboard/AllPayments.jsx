import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { X } from "lucide-react"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AllPayments = () => {
    const [payments, setPayments] = useState([])
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)
    const [paymentIdData, setPaymentIdData] = useState([])
    const [startDate, setStartDate] = useState(new Date('2021-01-01'))
    const [endDate, setEndDate] = useState(new Date())

    const fetchPaymentId = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-payment-data/${id}`)
            // console.log(response.data.payment)
            setPaymentIdData(response.data.payment)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
            // console.error(error)
        }
    }

    const fetchAllPayments = async () => {
        toast.loading("Fetching all payments")
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-payment-data`, {
                withCredentials: true,
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                },
            })
            toast.dismiss()
            setPayments(response.data?.payments)
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data?.message || "Something went wrong")
            // console.error(error)
        }
    }

    useEffect(() => {
        fetchAllPayments();
    }, [startDate, endDate])

    const downloadPDF = () => {
        toast.loading("Downloading PDF...");

        const input = document.getElementById('payment-table');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const margin = 15; // Increased padding from left and right
            const pdfWidth = 210 - 2 * margin; // A4 width minus margins
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add Title
            pdf.setFontSize(18);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(20, 20, 20); // Darker text color for title
            pdf.text('Aprajita Foundation', margin, 20);

            // Add Start and End Dates
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(100, 100, 100); // Lighter text color for dates
            const formattedStartDate = startDate.toISOString().slice(0, 10);
            const formattedEndDate = endDate.toISOString().slice(0, 10);
            pdf.text(`From: ${formattedStartDate}   To: ${formattedEndDate}`, margin, 30);

            // Add a line separator
            pdf.setLineWidth(0.5);
            pdf.setDrawColor(200, 200, 200); // Lighter gray color for the line
            pdf.line(margin, 35, 210 - margin, 35);

            // Add the table image with padding
            pdf.addImage(imgData, 'PNG', margin, 40, pdfWidth, imgHeight);

            // Save the PDF
            pdf.save('payment-data.pdf');
            toast.dismiss();
        }).catch(() => {
            toast.dismiss();
            toast.error('Failed to download PDF');
        });
    };


    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-800 m-4">All Payments</h3>
                <div className="flex items-center md:space-x-4 flex-wrap space-x-2 space-y-3">
                    <label htmlFor="start-date" className="font-semibold text-gray-800">
                        Start Date:
                    </label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate.toISOString().slice(0, 10)}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                        className="border-gray-300 rounded-md px-2 py-1"
                    />
                    <label htmlFor="end-date" className="font-semibold text-gray-800">
                        End Date:
                    </label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate.toISOString().slice(0, 10)}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                        className="border-gray-300 rounded-md px-2 py-1"
                    />
                    <button
                        onClick={downloadPDF}
                        className="bg-indigo-500 text-white py-1 px-2 font-semibold rounded"
                    >
                        Download All Payment Data
                    </button>
                </div>
            </div>
            <div className="mt-4 overflow-x-auto">
                <table id="payment-table" className="min-w-full bg-white rounded-md">
                    <thead>
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Name</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Email</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Amount</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Date</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-500">Time</th>
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
                                    <td className="text-left py-3 px-4">
                                        {new Date(payment.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="text-left py-3 px-4">{new Date(payment.date).toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })}</td>
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
                                <p><strong>Name: </strong> {paymentIdData.name}</p>
                                <p><strong>Email: </strong> {paymentIdData.email}</p>
                                <p><strong>Amount: </strong> {paymentIdData.amount}</p>
                                <p><strong>Date: </strong> {new Date(paymentIdData.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</p>
                                <p><strong>Time: </strong>{new Date(paymentIdData.date).toLocaleTimeString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}</p>
                                <p><strong>Phone: </strong> {paymentIdData.phone}</p>
                                <p><strong>Payment ID: </strong> {paymentIdData.razorpay_payment_id}</p>
                                <p><strong>Order ID: </strong> {paymentIdData.razorpay_order_id}</p>
                                {/* <p><strong>Signature: </strong> {paymentIdData.razorpay_signature}</p> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllPayments