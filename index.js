// const { default: mongoose } = require("mongoose");

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/my-ecommerce");
app.use(express.json()); // Middleware for parsing JSON

const cors = require('cors');
app.use(cors());

// user_routes
const user_routes = require('./routes/userRoutes');
app.use('/api',user_routes);

// store_routes
const store_routes = require('./routes/storeRoute');
app.use('/api',store_routes);

// category_routes
const category_routes = require('./routes/categoryRoutes');
app.use('/api',category_routes);

// subcategory_routes
const subcategory_routes = require('./routes/subcategoryRoutes');
app.use('/api',subcategory_routes);

// product_routes
const product_routes = require('./routes/productRoutes');
app.use('/api',product_routes);

// common_routes
const common_routes = require('./routes/commonRoutes');
app.use('/api',common_routes);

// card_routes
const card_routes = require('./routes/cardRoutes');
app.use('/api',card_routes);

// Buy_product_routes
const buy_product_routes = require('./routes/buyproductRoutes');
app.use('/api',buy_product_routes);

// Barand_Logo_routes
const barand_Logo_routes = require('./routes/logoRoutes');
app.use('/api',barand_Logo_routes);

// tag_routes
const tag_routes = require('./routes/tagRoutes');
app.use('/api',tag_routes);

// Size_routes
const size_routes = require('./routes/sizeRoutes');
app.use('/api',size_routes);

// color_routes
const color_routes = require('./routes/colorRoutes');
app.use('/api',color_routes);

app.listen(5000, () =>{
    console.log("Server id ready");

})