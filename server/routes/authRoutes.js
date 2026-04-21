const express = require('express');
const passport = require('passport');
const User = require('../models/userModel');
const router = express.Router() //mini instance

// to show the form of signup
router.get('/register' , (req,res)=>{
    res.render('auth/signup');
})

// actually want to register a user in my DB
router.post('/register' , async(req,res)=>{

})

// to get login form
router.get('/login' , (req,res)=>{
    res.render('auth/login');
})

module.exports = router;

