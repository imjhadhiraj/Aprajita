import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { loginAdmin, logout, profile, registerAdmin, updateProfile } from './controllers/User.controller.js';
import { createPayment, storeVerifiedPayment } from './controllers/payment.controller.js';
import { authAdmin } from './middlewares/authAdmin.middleware.js';
import { addEvent, addTeamMember, deleteEvent, deleteGalleryImage, deleteTeamMember, getAllEvents, getAllTeamMembers, getGalleryImages, uploadGalleryImage } from './controllers/services.controller.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

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

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: "Too many requests, please try again later.",
});

// ----------admin auth routes----------------
router.route('/register-admin').post(
    authAdmin,
    registerAdmin);
router.route('/login-admin').post(limiter, loginAdmin);
router.route('/update-adminProfile').post(authAdmin, updateProfile);
router.route('/admin-profile').post(authAdmin, profile);
router.route('/logout').get(logout);
//----------service routes----------------

// # Gallery routes 
router.route('/upload-gallery-image').post(
    authAdmin,
    uploadGalleryImage);

router.route('/delete-gallery-image/:id').delete(authAdmin, deleteGalleryImage);
router.route('/get-gallery-images').get(getGalleryImages);

// # Events routes
router.route('/add-event').post(
    authAdmin,
    addEvent);

router.route('/delete-event/:id').delete(authAdmin, deleteEvent);
router.route('/get-events').get(getAllEvents);


// # Team Member routes
router.route('/add-team-member').post(
    authAdmin,
    // upload.single('profileImg'),
    addTeamMember);

router.route('/delete-team-member/:id').delete(authAdmin, deleteTeamMember);
router.route('/get-team-members').get(getAllTeamMembers);

// ----------- payment----------------
router.route('/create-payment').post(createPayment)
router.route('/verify-payment').post(storeVerifiedPayment);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 
