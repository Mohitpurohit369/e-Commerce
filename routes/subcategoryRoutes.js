
const express = require ("express");
const subCategory_route = express();


const bodyParser = require('body-parser');
subCategory_route.use(bodyParser.json()); 
subCategory_route.use(bodyParser.urlencoded({extended:true}));



const multer = require("multer");
const path = require('path');

subCategory_route.use(express.static('public'));

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



const subcategory_Controller = require("../controllers/subCategoryController");
const auth = require("../config/auth");  // Ensure this is a middleware function

subCategory_route.post('/add-sub-category',upload.single('images'),subcategory_Controller.create_subcategory);

subCategory_route.get('/get-sub-category',subcategory_Controller.getall_subcategory);

module.exports = subCategory_route;