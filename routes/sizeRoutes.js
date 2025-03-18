const express = require("express");
const size_router = express.Router();

const bodyParser = require('body-parser');
size_router.use(bodyParser.json()); 
size_router.use(bodyParser.urlencoded({extended:true}));

const auth = require("../config/auth");
const sizeController = require('../controllers/sizeController');

size_router.post('/size',sizeController.createSize);

size_router.get('/get-size',sizeController.getAllSizes);

size_router.get('/get-size/:id',sizeController.getSizeById);

size_router.put('/update-size/:id',sizeController.updateSize);

size_router.delete('/delete-size/:id',sizeController.deleteSize);






module.exports = size_router;