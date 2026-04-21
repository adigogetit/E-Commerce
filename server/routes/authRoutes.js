const express = require('express');
const passport = require('passport');
const User = require('../models/userModel');
const router = express.Router() //mini instance

// to show the form of signup
router.get('/register', (req, res) => {
    res.render('auth/signup');
})

// actually want to register a user in my DB
router.post('/register', async (req, res) => {
    let { email, password, username, role } = req.body;

    const user = new User({ email, username, role });

    const newUser = await User.register(user, password);

    res.redirect('/login');
})

// to get login form
router.get('/login', (req, res) => {
    res.render('auth/login');
})

// to actually login via the db
router.post('/login', 
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        failureMessage: true 
    }),
    (req,res)=>{
        req.flash('success' , 'welcome back')
        res.redirect('/products');
})

module.exports = router;

