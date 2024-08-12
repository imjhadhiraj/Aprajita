import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer';
import mongoose from 'mongoose';
import { loginAdmin, registerAdmin } from './controllers/User.controller.js';
import { createPayment, storeVerifiedPayment } from './controllers/payment.controller.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/') // Define the destination folder
    },
    filename: function (req, file, cb) {
        // Generate a new filename using the original name, timestamp, and extension
        let fileNewName = path.parse(file.originalname.replace(/\s/g, '_')).name + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fileNewName) // Use the original file name with date
    }
});
const upload = multer({ storage });
const router = express.Router();
app.use('/', router);

// Database connection
(async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.log('Database connection failed', err);
        process.exit(1);
    });
})()

app.get('/health', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

router.route('/register-admin').post(
    upload.single('profileImg'),
    registerAdmin);

router.route('/login-admin').post(loginAdmin);

router.route('/create-payment').post(createPayment)
router.route('/verify-payment').post(storeVerifiedPayment);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 
