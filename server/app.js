const express = require('express'); 
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const assets = require('./assest');

// connect mongo db
mongoose.connect('mongodb://127.0.0.1:27017/e-shop')
.then(()=>{
    console.log("connected to db successfully");
})
.catch((err)=>{
    console.log("error in connecting to db",err);
})

// views folder for static files
app.use(express.static(path.join(__dirname, 'public')));
// setting up views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// seed the database
assets();

app.listen(3000,()=>{
    console.log("server is live");
})