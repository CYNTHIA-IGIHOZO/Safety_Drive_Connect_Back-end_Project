import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import configuration from '../configs/index.js';

const authorizeRoles = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found.' });
            }

            // Assuming user.roles is an array of roles associated with the user
            if (!allowedRoles.some(role => user.role.includes(role))) {
                return res.status(403).json({ message: 'Access denied.' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized.' });
        }
    };
};

export { authorizeRoles };
