const express = require("express");
const router = express();

router.set('view engine', 'ejs');
router.set('views', __dirname + '/../views');

router.get('/', (req,res)=>{
    res.redirect('/home');
});

router.get('/home', (req,res)=>{
    console.log(req.cookies.user);

    res.render('home',{ user : req.cookies.user});
});

router.get('/login', (req,res)=>{
    res.render('login');
});

router.get('/register', (req,res)=>{
    res.render('register');
});

router.get('/logout', (req,res)=>{
    res.redirect('login');
});

// PROTECTED ROUTES

router.get('/protected', (req,res)=>{
    console.log('protected');
    res.render('protected');
});



module.exports = router;
