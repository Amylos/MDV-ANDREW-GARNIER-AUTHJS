const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


function Authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');
    try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
    } catch {
    res.redirect('/login');
    }
}

function CheckRole(role) {
    return (req, res, next) => {
        try{
            // Check the user role
            if (req.cookies.session.role !== role) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
            }
            next();
        }catch(ex){
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
    };
};

module.exports = {
    Authenticate,
    CheckRole
}