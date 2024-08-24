import mongoose from 'mongoose';

const googleUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);
export default GoogleUser;