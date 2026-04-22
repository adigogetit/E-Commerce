const {productSchema , reviewSchema} = require('./schema')

const validateProduct = (req,res,next)=>{
    const {name,img,price,desc} = req.body;

    // it gives value(now we dont need it) and error if any error occurs during validation
    const {error} = productSchema.validate({name,img,price,desc})
    
    if(error){
        return res.render('error');
    }
    next();
}

const validateReview = (req,res,next)=>{
    const {rating,comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment})
    if(error){
        return res.render('error');
    }
    next();
}

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error' , 'please login first');
        return res.redirect('/login');
    }
    next();
}

module.exports = {validateReview , validateProduct ,isLoggedIn}
















