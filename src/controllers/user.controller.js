const User = require('../models/user.model');
const Details = require('../models/details.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


module.exports.GetDetails = async (req,res) =>{
    const {userId} = req.body;
    try{
        const userDetails = await Details.findOne({where : {userId}});
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}

module.exports.GetStudents = async (req,res) =>{
    try{
        const students = await User.findAll({ where: { role: 'student' } });
        if(students) return res.status(300).json({message : "Students can not be found"});
        res.status(200).json(students);
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}

module.exports.GetTeachers = async (req,res) =>{
    try{
        const teachers = await User.findAll({ where: { role: 'teacher' } });
        if(teachers) return res.status(300).json({message : "Teachers can not be found"});
        res.status(200).json(teachers);
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}

module.exports.UpdateRole = async (req,res) =>{
    const {id, role} = req.body;
    try{
        const user = await User.findOne({where : {id}});
        user.role = role;
        // PUSH IT IN DB

    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}










