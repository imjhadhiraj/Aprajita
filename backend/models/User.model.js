import { mongoose } from 'mongoose';

const adminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    profileImg: {
        type: String
    }
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);
export default AdminUser;