const bodyParser = require("body-parser");
const express = require ("express");
const user_route = express();


// const bodyParser = require('body-parser');
user_route.use(bodyParser.json()); 
user_route.use(bodyParser.urlencoded({extended:true}));

const multer = require("multer");
const path = require('path');

user_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/userImages"),function(error,suceess){
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


const user_controller = require("../controllers/userController");
const auth = require("../config/auth");

// resgister
user_route.post('/resgister',upload.single('image'),user_controller.register_user);

// login
user_route.post('/login',user_controller.login_user);

// update-password
user_route.put('/update-password',auth,user_controller.updatePassword);

// forget-password
user_route.put('/forget-password',auth,user_controller.forget_password);


module.exports = user_route;