import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { changePassword, loginAdmin, logout, profile, registerAdmin, updateProfile } from './controllers/User.controller.js';
import { createPayment, getAllPayments, getPaymentById, storeVerifiedPayment } from './controllers/payment.controller.js';
import { authAdmin } from './middlewares/authAdmin.middleware.js';
import { addEvent, addTeamMember, deleteEvent, deleteGalleryImage, deleteTeamMember, deleteUnusedImage, getAllEvents, getAllGalleryImages, getAllTeamMembers, getEvents, getGalleryImages, getTeamMembers, updateEvent, updateTeamMember, uploadGalleryImage } from './controllers/services.controller.js';
import rateLimit from 'express-rate-limit';
import { Googlelogout, googleUserLogin } from './controllers/GoogleUser.controller.js';

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
router.route('/change-password').put(authAdmin, changePassword);
router.route('/admin-profile').post(authAdmin, profile);
router.route('/logout').post(logout);
//----------service routes----------------

// # delete cloudinary unused image 
router.route('/delete-cloudinary-image').delete(authAdmin, deleteUnusedImage);

// # Gallery routes 
router.route('/upload-gallery-image').post(authAdmin, uploadGalleryImage);
router.route('/delete-gallery-image/:id').delete(authAdmin, deleteGalleryImage);
router.route('/get-gallery-images').get(getGalleryImages);
router.route('/get-all-gallery-images').get(getAllGalleryImages);

// # Events routes
router.route('/add-event').post(authAdmin, addEvent);
router.route('/update-event/:id').put(authAdmin, updateEvent);
router.route('/delete-event/:id').delete(authAdmin, deleteEvent);
router.route('/get-events').get(getEvents);
router.route('/get-all-events').get(getAllEvents);

// # Team Member routes
router.route('/add-team-member').post(authAdmin, addTeamMember);
router.route('/update-team-member/:id').put(authAdmin, updateTeamMember);
router.route('/delete-team-member/:id').delete(authAdmin, deleteTeamMember);
router.route('/get-team-members').get(getTeamMembers);
router.route('/get-all-team-members').get(getAllTeamMembers);

// ----------- payment----------------
router.route('/create-payment').post(createPayment)
router.route('/verify-payment').post(storeVerifiedPayment);
router.route('/get-payment-data/:id').get(getPaymentById);
router.route('/get-all-payment-data').get(authAdmin, getAllPayments);

// ---------Google auth routes----------------
router.route('/google-login').post(googleUserLogin);
router.route('/google-logout').post(Googlelogout);

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 
