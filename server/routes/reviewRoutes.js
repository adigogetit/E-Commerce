const express = require('express');
const router = express.Router() //mini instance
const Product = require('../models/productModel')
const Review = require('../models/reviewModel')
const {validateReview} = require('../middleware');

// to add a review for a particular product
router.post('/products/:id/review', validateReview, async (req, res) => {
    try {
        let { id } = req.params; // get from url
        let { rating, comment } = req.body;  // get from form data

        const product = await Product.findById(id); //fetch the product from db using id
        const review = new Review({ rating, comment }); // create a new review using the form data

        product.reviews.push(review); // push the review into the reviews array of the product 
        await review.save();
        await product.save();

        req.flash('success', 'Review added successfully'); // flash message for success 

        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

module.exports = router;

