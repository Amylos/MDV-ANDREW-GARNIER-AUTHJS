const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


function Authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token)  return res.status(403).json({ message: 'Invalid credentials' });
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch {
        return res.status(403).json({ message: 'Invalid credentials' });
    }
}

function CheckRole(role) {
    return (req, res, next) => {
        try {
            if (req.cookies.user.role === 'admin') {
                return next();
            }
            if (req.cookies.user.role !== role) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
            }
            next();
        } catch (ex) {
            console.error("Error in CheckRoleView:", ex);
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
    };
};


function AuthenticateView(req, res, next) {
    if (!req.cookies || !req.cookies.token) {
        return res.redirect('/login');
    }
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token invalid", error);
        res.redirect('/login');
    }
}

function CheckRoleView(role) {
    return (req, res, next) => {
        try {
            if (req.cookies.user.role === 'admin') {
                return next();
            }
            if (req.cookies.user.role !== role) {
                return res.redirect('/home');
            }
            next();
        } catch (ex) {
            console.error("Error in CheckRoleView:", ex);
            return res.redirect('/home');
        }
    };
};

module.exports = {
    Authenticate,
    CheckRole,
    AuthenticateView,
    CheckRoleView
}