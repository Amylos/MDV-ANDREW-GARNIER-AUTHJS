const User = require('../models/user.model');
const Details = require('../models/details.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.Register = async(req,res) =>{
    const {email, password, firstName, lastName,age, address, phone} = req.body;
    try{
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
            role : existingUser.role
        });
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
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}













