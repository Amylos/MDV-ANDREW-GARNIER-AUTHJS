const User = require('../models/user.model');
const Details = require('../models/details.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


module.exports.GetDetails = async (req,res) =>{
    const userId = req.params.id;
    try{
        const userDetails = await Details.findOne({where : {userId}});
        if(!userDetails) res.status(500).json({ message: "Server error"});
        res.status(200).json(userDetails);
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}

module.exports.GetStudents = async (req,res) =>{
    try{
        const students = await User.findAll({ where: { role: 'student' } });
        console.log(students);
        if(!students) return res.status(300).json({message : "Students can not be found"});
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
        console.log(teachers);
        if(!teachers) return res.status(300).json({message : "Teachers can not be found"});
        res.status(200).json(teachers);
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}

module.exports.GetUsers = async (req,res) =>{
    try{
        const users = await User.findAll();
        console.log(users);
        if(!users) return res.status(300).json({message : "Users can not be found"});
        res.status(200).json(users);
    }
    catch(ex){
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
}

module.exports.UpdateRole = async (req, res) => {
    const id = req.params.id;
    const role = req.body.role;

    console.log("Received ID:", id, "| New role:", role);

    try {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = role;
        await user.save();

        res.status(200).json({message: "Role updated successfully",});
    } catch (ex) {
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
};

module.exports.DeleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (ex) {
        console.error("Server error:", ex);
        res.status(500).json({ message: "Server error", error: ex.message });
    }
};