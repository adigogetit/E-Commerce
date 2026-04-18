const mongoose = require('mongoose');
const Product = require('./models/productModel');


const products = [
    {
        name: "Laptop",
        img: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
        price: 120000,
        desc: "coding ke liye best laptop"
    },
    {
        name: "Mechanical Keyboard",
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        price: 7500,
        desc: "typing experience ko next level pe le jane ke liye"
    },
    {
        name: "Mouse",
        img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
        price: 1200,
        desc: "gaming and work dono ke liye best mouse"
    },
    {
        name: "Monitor 27 inch",
        img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
        price: 22000,
        desc: "entertainment and work dono ke liye best monitor"
    },
    {
        name: "External SSD 1TB",
        img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
        price: 9000,
        desc: "fast data transfer ke liye best external ssd"
    }
];

async function assets(){
    // await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("data seeded successfully");
}

module.exports = assets;


