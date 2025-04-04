const express = require('express');
const router = express();

const {Login, Register, Logout} = require('../controllers/auth.controller');
const {GetDetails, GetStudents, GetTeachers, UpdateRole} = require('../controllers/user.controller');


router.post('/login', Login);

router.post('/register', Register);

router.get('/logout', Logout);

router.get('/details',GetDetails);
router.get('/students',GetStudents);
router.get('/teachers',GetTeachers);
router.patch('/role', UpdateRole);

module.exports = router;

