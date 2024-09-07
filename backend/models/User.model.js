import { mongoose } from 'mongoose';

const adminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    profileImg: {
        type: String
    }
}, {
    timestamps: true
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);
export default AdminUser;