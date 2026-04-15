const express = require('express');
const app = express();
const path = require('path');

// public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// setting up views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000,()=>{
    console.log("server is live");
})