import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import { uploadOnCloudinary } from '../utils/Cloudinary.Utils.js';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const salt = bcrypt.genSaltSync(12);

export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    try {
        const profileImg = req?.file;
        let profileImgPath = null;
        if (profileImg) {
            profileImgPath = profileImg?.path;
            profileImgPath = await uploadOnCloudinary(profileImgPath)
            if (!profileImgPath)
                return res.status(400).json({ error: 'Image upload failed' });

            profileImgPath = profileImgPath.url
        }
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImg: profileImgPath
        });
        if (!user) {
            return res.status(400).json({ error: 'User creation failed' });
        }

        return res
            .status(200)
            .json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        return res
            .status(200)
            .json({ message: 'Login successful', token, user });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}