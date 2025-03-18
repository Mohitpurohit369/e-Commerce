const express = require("express");
const common_router = express();

const bodyParser = require("body-parser");
common_router.use(bodyParser.json());
common_router.use(bodyParser.urlencoded({extended:true}));

const auth = require("../config/auth");
const common_controller = require('../controllers/commonController');

common_router.get("/common-data",auth,common_controller.commom_data);

module.exports = common_router;