const mongoose = require('mongoose');
const Review = require('./reviewModel');


const productSchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:true
    }, 
    img:{
        type:String,
        trim:true
    },
    price: {
        type:Number,
        min:0,
        required:true
    },
    desc: {
        type:String,
        trim:true
    },
    reviews:[
        {
            // this is how we create a relationship between two models in mongoose (one to many relationship)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

// middleware jo BTS mongodb operations karwane par use hota hai and iske andar pre nd post middleware hote hai which are basically used over the schema and before the model is created and

// mongodb middleware hai yeah jo ki findOneAndDelete ke baad chalta hai aur uske andar humne product ko pass kiya hai jise humne delete kiya hai aur uske andar hum check karte hai ki agar us product ke reviews array me koi review hai to hume un reviews ko bhi delete karna padega warna wo reviews orphan ho jayenge yani ki wo kisi product se associated nahi rahenge aur database me fuzool space lete rahenge
productSchema.post('findOneAndDelete' , async function(product){
    if(product.reviews.length > 0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

let Product = mongoose.model('Product' , productSchema);
module.exports = Product;