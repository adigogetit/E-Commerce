const express = require('express'); 
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const assets = require('./assest');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/userModel');

const reviewroutes = require('./routes/reviewRoutes');
const productroutes = require('./routes/productRoutes');
const authroutes = require('./routes/authRoutes');


// connect mongo db
mongoose.connect('mongodb://127.0.0.1:27017/e-shop')
.then(()=>{
    console.log("connected to db successfully");
})
.catch((err)=>{
    console.log("error in connecting to db",err);
})

// session 
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true ,  
    cookie: { 
        httpOnly: true ,
        expires: Date.now() + 24*7*60*60*1000 , 
        maxAge:24*7*60*60*1000
    }
}


// views folder for static files like css and js
app.use(express.static(path.join(__dirname, 'public')));

// setting up view engine
app.set('view engine', 'ejs'); // ejs is a templating language (read the views file)
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate); // for using layout in ejs like navbar and boilerplate code

// middleware to parse the form data (so we dont get undefined when we submit the form)
app.use(express.urlencoded({extended:true}));

// method override to use put and delete methods in forms
app.use(methodOverride('_method'));

// flash messages to show success and error messages
app.use(flash());

// session is used here 
app.use(session(configSession));

// passport is used here
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// locals is used to make the current user and flash messages available in all the templates without having to pass them in every render method
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// PASSPORT WAALI
passport.use(new LocalStrategy(User.authenticate()));


// seed the database
// assets();

// product routes - har incoming request to /products will be handled by productroutes
app.use(productroutes);
// review routes 
app.use(reviewroutes)
// auth routes 
app.use(authroutes)

app.listen(3000,()=>{
    console.log("server is live");
})