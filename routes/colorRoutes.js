const express = require("express");
const color_router = express.Router();

const bodyParser = require('body-parser');
color_router.use(bodyParser.json()); 
color_router.use(bodyParser.urlencoded({extended:true}));

const auth = require("../config/auth");
const colorController = require('../controllers/colorController');

color_router.post('/color',colorController.createColor);

color_router.get('/get-color',colorController.getAllColors);

color_router.get('/get-color/:id',colorController.getColorById);
                    
color_router.put('/update-color/:id',colorController.updateColor);

color_router.delete('/delete-color/:id',colorController.deleteColor);






module.exports = color_router;