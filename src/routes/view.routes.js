const express = require("express");
const router = express();

/**/

const QRCode = require('qrcode');
const OTPAuth = require('otpauth');

/**/

const {AuthenticateView,CheckRoleView} = require('../middlewares/auth.middleware');




router.set('view engine', 'ejs');
router.set('views', __dirname + '/../views');

router.get('/login', (req,res)=>{
    res.render('login');
});

router.get('/register', (req,res)=>{
    res.render('register');
});

router.get('/logout', (req,res)=>{
    res.redirect('login');
});

router.get('/', (req,res)=>{
    res.redirect('/home');
});

router.get('/home', (req,res)=>{
    res.render('home',{ user : req.cookies.user});
});

router.get('/profile', (req,res)=>{
    res.render('profile',{user : req.cookies.user});
});

router.get('/teachers',AuthenticateView,CheckRoleView('admin'), (req,res)=>{  // Secured with MFA
    res.redirect('/verify');
});

router.get('/students',AuthenticateView,CheckRoleView('teacher'), (req,res)=>{
    res.render('students',{user : req.cookies.user});
});

router.get('/users',AuthenticateView,CheckRoleView('admin'), (req,res)=>{
    res.render('users',{user : req.cookies.user});
});


router.get('/verify', async (req, res) => {
    const user = req.cookies.user;
    console.log('USER:', user);
console.log('EMAIL:', user.email);

    if (!req.session.authenticated) return res.redirect('/');

    try{
        const totp = new OTPAuth.TOTP({
            issuer: 'MFA-Demo-App',
            label: user.email,
            algorithm: 'SHA1',
            digits: 6,
            period: 30
        });
        user.totpSecret = totp.secret.base32;
        const otpauthUrl = totp.toString();
        console.log(otpauthUrl);
        const qr = await QRCode.toDataURL(otpauthUrl);

        res.cookie('user', { ...user, totpSecret: user.totpSecret });
        // WTF
        return res.render('verify', { qr, error: null, user });
    }
    catch(ex){
        return res.redirect('/');
    }
});



router.post('/verify', (req, res) => {
    console.log('2');

    const { token } = req.body;
    const user = req.cookies.user;

    if (!user || !user.totpSecret) {
        return res.status(400).send('Utilisateur ou secret TOTP manquant.');
    }

    const totp = new OTPAuth.TOTP({
        issuer: 'MFA-Demo-App',
        label: user.email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(user.totpSecret)
    });

    const now = Date.now();
    const delta = totp.validate({ token, timestamp: now });

    if (delta !== null) {
        res.cookie('user', { ...user, mfaValidated: true });
        res.redirect('/secret');
    } else {
        res.render('verify', { qr: null, error: 'Code TOTP invalide.', user});
    }
});

router.get('/secret', (req, res) => {
    console.log('3');
    const user = req.cookies.user;
    if (req.session.authenticated && req.cookies.user.mfaValidated) {
        res.cookie('user', { ...user, mfaValidated: false,totpSecret:null });
        res.render('teachers',{user : req.cookies.user});
    } else {
        res.redirect('/');
    }
});



module.exports = router;
