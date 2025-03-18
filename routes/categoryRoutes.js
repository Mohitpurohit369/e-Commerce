
const express = require("express");
const category_route = express.Router();  // Use Router instead of express()

const categoryController = require("../controllers/categoryController");
const auth = require("../config/auth");  // Ensure this is a middleware function

// Middleware for parsing JSON (built into Express)
category_route.use(express.json());
category_route.use(express.urlencoded({ extended: true }));

const multer = require("multer");
const path = require('path');

category_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/categroyImages"),function(error,suceess){
            if(error) throw error
        });

    },filename:function(req,file,cb){
        const name =  Date.now()+ "-" + file.originalname; 
        cb(null,name,function(error1,suceess1){
            if(error1) throw error1
        });


    }
}) 
const upload = multer({storage:storage});

// Routes
category_route.post('/add-category',upload.single("images"), categoryController.add_category);

// Get all categories
category_route.get('/get-category',categoryController.getall_category);

module.exports = category_route;
    
