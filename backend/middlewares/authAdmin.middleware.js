import jwt from 'jsonwebtoken';

export const authAdmin = async (req, res, next) => {
    try {
        const { token } = req.cookies || req.headers.authorization;
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
