import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer';
import mongoose from 'mongoose';
import { loginAdmin, logout, profile, registerAdmin, updateProfile } from './controllers/User.controller.js';
import { createPayment, storeVerifiedPayment } from './controllers/payment.controller.js';
import { authAdmin } from './middlewares/authAdmin.middleware.js';
import { addEvent, deleteEvent, deleteGalleryImage, getAllEvents, getGalleryImages, uploadGalleryImage } from './controllers/services.controller.js';

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

// ----------admin auth routes----------------
router.route('/register-admin').post(
    authAdmin,
    upload.single('profileImg'),
    registerAdmin);
router.route('/login-admin').post(loginAdmin);
router.route('/update-admin').post(authAdmin, updateProfile);
router.route('/admin-profile').post(authAdmin, profile);
router.route('/logout').get(logout);
//----------service routes----------------

// # Gallery routes 
router.route('/upload-gallery-image').post(
    authAdmin,
    upload.single('galleryImg'),
    uploadGalleryImage);

router.route('/delete-gallery-image/:id').delete(authAdmin, deleteGalleryImage);
router.route('/get-gallery-images').get(getGalleryImages);

// # Events routes
router.route('/add-event').post(
    authAdmin,
    upload.single('eventImg'),
    addEvent);

router.route('/delete-event/:id').delete(authAdmin, deleteEvent);
router.route('/get-events').get(getAllEvents);

// ----------- payment----------------
router.route('/create-payment').post(createPayment)
router.route('/verify-payment').post(storeVerifiedPayment);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 
