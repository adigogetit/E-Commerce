const express = require('express'); 
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const assets = require('./assest');
const productroutes = require('./routes/productRoutes');
const ejsMate = require('ejs-mate');

// connect mongo db
mongoose.connect('mongodb://127.0.0.1:27017/e-shop')
.then(()=>{
    console.log("connected to db successfully");
})
.catch((err)=>{
    console.log("error in connecting to db",err);
})

// views folder for static files like css and js
app.use(express.static(path.join(__dirname, 'public')));

// setting up view engine
app.set('view engine', 'ejs'); // ejs is a templating language (read the views file)
app.engine('ejs', ejsMate); // for using layout in ejs
app.set('views', path.join(__dirname, 'views'));


// seed the database
// assets();

// product routes - har incoming request to /products will be handled by productroutes
app.use(productroutes);

app.listen(3000,()=>{
    console.log("server is live");
})