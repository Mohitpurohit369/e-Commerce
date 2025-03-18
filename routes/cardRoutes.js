const express = require ("express");
const card_route = express();


const bodyParser = require('body-parser');
card_route.use(bodyParser.json()); 
card_route.use(bodyParser.urlencoded({extended:true}));

const card_controller = require("../controllers/cardControoler");
const auth = require("../config/auth");

card_route.post("/add-to-card",auth,card_controller.add_to_card);



module.exports = card_route;