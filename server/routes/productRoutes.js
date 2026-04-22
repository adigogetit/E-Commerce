const express = require('express');
const Product = require('../models/productModel');
const router = express.Router() //mini instance
const {validateProduct,isLoggedIn , isseller} = require('../middleware');

// to show all the products
router.get('/products', async (req, res) => {
    try {
        let products = await Product.find({});
        res.render('products/index', { products });
    } catch (err) {
        res.status(500).render('error', { err: e.message });
    }
})

// to show the form for new product
router.get('/product/new',isLoggedIn, (req, res) => {
    try {
        res.render('products/new');
    } catch (err) {
        res.status(500).render('error', { err: e.message });
    }
})

// to add new product
router.post('/products', validateProduct, isLoggedIn, async (req, res) => {
    try {
        let { name, img, price, desc } = req.body;
        await Product.create({ name, img, price, desc, author:req.user._id});

        req.flash('success' , 'Product added successfully');
        res.redirect('/products')
    } catch (err) {
        res.status(500).render('error', { err: e.message });
    }
})

// to show a particular product
router.get('/products/:id', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;

        // jab ek particular product ko show karna hai to uske sath uske reviews bhi show karne hai to hume us product ke reviews ko populate karna padega
        let foundProduct = await Product.findById(id).populate('reviews');// here we are populating the reviews aray

        res.render('products/show', { foundProduct , mes:req.flash('success')});

    } catch (err) {
        res.status(500).render('error', { err: e.message });
    }
})

// form to edit the product
router.get('/products/:id/edit', isLoggedIn, isseller, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct })
    } catch (err) {
        res.status(500).render('error', { err: e.message });
    }
})

// to actually edit the data in db
router.patch('/products/:id', validateProduct, async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc })
        req.flash('success' , 'Product edited successfully');
        res.redirect(`/products/${id}`);
    } catch (err) {
        res.status(500).render('error', { err: e.message });
    }
})


// to delete a product
router.delete('/products/:id', isLoggedIn, isseller ,  async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findById(id);

        // to delete reviews associated with the product -- easy way
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }

        await Product.findByIdAndDelete(id);

        req.flash('success' , 'Product deleted successfully');
        res.redirect('/products');
    } catch (err) {
        res.status(500).render('error', { err: e.message });
    }
})

module.exports = router;
