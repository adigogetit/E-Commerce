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

const isseller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error' , 'yo dont have permisssion')
        return res.redirect('/products')
    }else if(req.user.role !== 'seller'){
        req.flash('error' , 'yo dont have permisssion')
        return res.redirect('/products')
    }
    next();
}

module.exports = {validateReview , validateProduct , isLoggedIn , isseller}
















