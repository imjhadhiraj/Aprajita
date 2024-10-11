import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Subscribers = mongoose.model('Subscriber', subscriberSchema);
export default Subscribers;
