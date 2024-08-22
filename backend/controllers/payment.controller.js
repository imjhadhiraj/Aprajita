import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/payment.model.js';
import dotenv from 'dotenv';
dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

export const createPayment = async (req, res) => {
    const { amount } = req.body;
    const amountInPaise = Number(amount) * 100;
    const options = {
        amount: amountInPaise,
        currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            return res.status(500).json({ message: "Something went wrong", err });
        }
        return res.status(200).json({ order });
    });
};

export const storeVerifiedPayment = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, email, amount, date, phone, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");
        if (signature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment request" });
        }
        const payment = new Payment({
            name,
            email,
            amount,
            date,
            phone,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        });

        // Save the payment to the database
        await payment.save();
        return res.status(200).json({ message: "Payment Successful" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findOne({ razorpay_payment_id: id });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ payment });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}