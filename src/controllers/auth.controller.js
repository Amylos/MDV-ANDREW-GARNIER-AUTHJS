const User = require('../models/user.model');
const Details = require('../models/details.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.Register = async(req,res) =>{



    const {email, password, firstName, lastName,age, address, phone} = req.body;
    try{

        const adminUser = await User.findOne({ where: { role: 'admin' } });

        if (!adminUser) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, parseInt(process.env.SALT));
            const newAdmin =  await User.create({
                username: process.env.ADMIN_USERNAME,
                email: process.env.ADMIN_EMAIL,
                hashedPassword: hashedPassword,
                firstName: process.env.ADMIN_FIRST_NAME,
                lastName: process.env.ADMIN_LAST_NAME,
                role: 'admin',
            });

            const userDetails = await Details.create({
                userId : newAdmin.dataValues.id,
                age : 100,
                address : "address Test",
                phone: " 00 00 00 00 00"
            });
            console.log('Admin user created');
        }
        const existingUser = await User.findOne({ where: { email } });
        if(existingUser) return res.status(400).json({message : "User already in the database"});

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        const newUser = await User.create({
            email : email,
            hashedPassword : hashedPassword,
            firstName: firstName,
            lastName: lastName,
        });

        const userDetails = await Details.create({
            userId : newUser.dataValues.id,
            age : age,
            address : address,
            phone: phone
        });

        res.redirect('/login');
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}


module.exports.Login = async(req,res) =>{
    const {email, password} = req.body;
    console.log(email,password);
    try{
        const existingUser = await User.findOne({ where: { email } });
        if(!existingUser) return res.status(400).json({message : "Invalid credentials"});

        const isValidPassword = await bcrypt.compare(password,existingUser.hashedPassword);
        if(!isValidPassword) return res.status(400).json({message : "Invalid credentials"});
        const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.cookie('token', token, { httpOnly: true });
        res.cookie('user', {
            id : existingUser.id,
            firstName : existingUser.firstName,
            lastName : existingUser.lastName,
            email: existingUser.email,
            role : existingUser.role,
            totpSecret: null,
            mfaValidated: false
        });
        req.session.authenticated = true;

        res.redirect('/home');
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}

module.exports.Logout = async(req,res) =>{
    try{
        res.clearCookie('token');
        res.clearCookie('user');
        res.redirect('/login');
        req.session.authenticated = false;
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}

