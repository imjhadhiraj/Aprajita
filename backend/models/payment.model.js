import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        length: 10,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
        unique: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;