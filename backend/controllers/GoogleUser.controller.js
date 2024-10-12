import GoogleUser from '../models/GoogleUser.model.js';
import jwt from 'jsonwebtoken';
import Subscribers from '../models/Subscriber.model.js';
/*
import admin from 'firebase-admin';
import serviceAccount from '../aprajita-firebase-adminsdk.json' assert { type: 'json' };
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
*/
export const googleUserLogin = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, picture, googleId } = req.body;
        let existingUser = await GoogleUser.findOne({
            email: email,
        });
        if (!existingUser) {
            const newUser = new GoogleUser({
                googleId,
                email,
                name,
                picture,
            });
            existingUser = await newUser.save();
            // make it subscriber and save it if not already subscribed
            const isUserSubscribed = await Subscribers.findOne({ email });
            if (!isUserSubscribed) {
                const newSubscriber = new Subscribers({
                    email
                });
                await newSubscriber.save();
            }
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.cookie('GoogleToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200)
            .set('Authorization', `Bearer ${token}`)
            .cookie('GoogleToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .json({ message: 'Login success', user: existingUser, GoogleToken: token });
    } catch (error) {
        return res.status(400).json({ message: error?.message });
    }
}

export const Googlelogout = async (req, res) => {
    try {
        if (req.cookies.GoogleToken || req.headers.authorization)
            return res
                .status(200)
                .clearCookie('GoogleToken')
                .set('Authorization', '')
                .json({ message: 'Logout success' });
        else
            return res.status(400).json({ message: 'Invaild Request' });
    } catch (error) {
        return res.status(400).json({ message: error?.message });
    }
}
