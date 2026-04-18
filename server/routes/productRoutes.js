const express = require('express');
const Product = require('../models/productModel');
const router = express.Router() //mini instance

// to show all the products
router.get('/products' , async(req,res)=>{
    let products = await Product.find({});
    res.render('products/index' , {products});
})

module.exports = router;
 