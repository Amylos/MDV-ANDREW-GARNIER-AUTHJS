const express = require('express');
const router = express();

const {Authenticate,CheckRole} = require('../middlewares/auth.middleware');
const {Login, Register, Logout} = require('../controllers/auth.controller');
const {GetDetails, GetStudents, GetTeachers,GetUsers, UpdateRole,DeleteUser} = require('../controllers/user.controller');

router.post('/login', Login);
router.post('/register', Register);
router.get('/logout', Logout);

router.get('/details/:id',GetDetails);
router.get('/students',Authenticate,CheckRole('teacher'),GetStudents);
router.get('/teachers',Authenticate,CheckRole('admin'),GetTeachers);
router.get('/users',Authenticate,CheckRole('admin'),GetUsers);
router.patch('/role/:id',Authenticate,CheckRole('admin'), UpdateRole);
router.delete('/users/:id',Authenticate,CheckRole('admin'), DeleteUser);


module.exports = router;

