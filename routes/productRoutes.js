const express = require("express");
const product_router = express.Router();

const bodyParser = require("body-parser");
product_router.use(bodyParser.json());
product_router.use(bodyParser.urlencoded({extended:true}));

const multer =  require('multer');

const path = require("path");

product_router.use(express.static('public'));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userImages/productImages'),function(error,success){
            if(error) {
                throw error
            }

        });
    },
    filename:function(req,file,cb){
        const name = Date.now() + "-" + file.originalname;
        cb(null,name,function(err,success){
            if(err) {
                throw err
            }

        });
    }
});
const upload = multer({storage:storage});

const auth = require("../config/auth");
const product_controller = require('../controllers/productController');

// Add product
product_router.post("/add-product",upload.array('images'),product_controller.createProduct);

// Get product
product_router.get("/get-product",auth,product_controller.getAllProducts);

// Search product
product_router.get("/search-product",auth,product_controller.search_product);

module.exports = product_router;
