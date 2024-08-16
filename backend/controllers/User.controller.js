import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import { uploadOnCloudinary } from '../utils/Cloudinary.utils.js';

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
        user.password = undefined;
        return res
            .cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            .status(200)
            .json({ message: 'Login successful', token, user });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const logout = async (req, res) => {
    try {
        // clear either cookie or the header token
        const { token } = req.cookies;
        if (token) {
            return res.status(200).clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            }).json({ message: 'Logout successful' });
        }
        else {
            return res.status(200).setHeader('Authorization', '')
                .json({ message: "Logout success" });
        }

    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const profile = async (req, res) => {
    const user = req.user;
    // console.log(user)

    const myuser = await User.findById(user._id).select('-password');
    if (!myuser) {
        return res.status(400).json({ error: 'User not found' });
    }
    return res
        .status(200)
        .json({
            message: 'Profile fetched successfully',
            user: myuser
        });
}

export const updateProfile = async (req, res) => { // only done by frontend not by postman
    const myUser = req.user;
    const { name, email, password, newPassword } = req.body;
    console.log(name, email, password, newPassword)
    if (!name || !email) {
        return res.status(400).json({ error: 'All fields are required' })
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    try {
        const profileImg = req?.files ? req.files['profileImg'][0] : undefined;
        let profileImgPath = null;
        if (profileImg) {
            profileImgPath = profileImg?.path;
            profileImgPath = await uploadOnCloudinary(profileImgPath)
            if (!profileImgPath)
                return res.status(400).json({ error: 'Image upload failed' });
            profileImgPath = profileImgPath.url
        }
        let hashedPassword = null;
        if (password && newPassword) {
            const user = await User.findOne({ email });
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            hashedPassword = bcrypt.hashSync(newPassword, salt);
        }
        const userById = await User.findById(myUser.id);
        if (!userById) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        if (userById.email !== email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ error: 'Email already exists' })
            }
        }
        let previousProfileImg = null;
        let user = null;

        if (hashedPassword === null) {
            userById.name = name;
            userById.email = email;
        }
        else {
            userById.name = name;
            userById.email = email;
            userById.password = hashedPassword;
        }

        if (profileImgPath) {
            previousProfileImg = userById.profileImg;
            userById.profileImg = profileImgPath;
        }
        user = await userById.save();
        if (!user) {
            return res.status(400).json({ error: 'Update failed' })
        }
        if (previousProfileImg) {
            await deleteFromCloudinary(previousProfileImg)
        }
        user.password = undefined;
        const newToken = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            profileImg: user?.profileImg
        }, process.env.JWT_SECRET, { expiresIn: '2d' });
        return res
            .status(200)
            .cookie('token', newToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            .json({ message: 'Profile updated successfully', user, token: newToken });
    }
    catch (error) {
        return res.status(400).json(error?.message);
    }
}