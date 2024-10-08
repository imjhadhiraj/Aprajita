import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const salt = bcrypt.genSaltSync(12);

export const registerAdmin = async (req, res) => {
    const { name, email, password, profileImg } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
        return res
            .status(400)
            .json({ error: 'Password must be at least 6 characters' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    try {
        // find if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImg
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
};
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
        const token = req.cookies?.token;
        if (token) {
            return res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            }).status(200).json({ message: 'Logout successful' });
        }
        else {
            if (!req.headers.authorization) {
                return res.status(400).json({ error: 'Unauthorized' });
            }
            return res.status(200).setHeader('Authorization', '')
                .json({ message: "Logout successful" });
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

export const updateProfile = async (req, res) => {
    const user = req.user;
    console.log(req.body)
    const { name, email, profileImg } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            name,
            email,
            profileImg
        }, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(400).json({ error: 'Update failed' });
        }
        return res
            .status(200)
            .json({
                message: 'Profile updated successfully',
                user: updatedUser
            });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}

export const changePassword = async (req, res) => {
    const user = req.user;
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (newPassword.length < 6) {
        return res
            .status(400)
            .json({ error: 'Password must be at least 6 characters' });
    }
    try {
        const myuser = await User.findById(user._id);
        if (!myuser) {
            return res.status(400).json({ error: 'User not found' });
        }
        if (!bcrypt.compareSync(password, myuser.password)) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            password: hashedPassword
        }, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(400).json({ error: 'Password update failed' });
        }
        return res
            .status(200)
            .json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(400).json(error?.message);
    }
}