const express = require("express");
const tag_router = express.Router();

const bodyParser = require('body-parser');
tag_router.use(bodyParser.json()); 
tag_router.use(bodyParser.urlencoded({extended:true}));

const auth = require("../config/auth");
const tagController = require('../controllers/tagController');

tag_router.post('/tag',tagController.create_tag);

tag_router.get('/get-tag',tagController.get_all_tag);

tag_router.get('/get-tag/:id',tagController.getby_id_tag);

tag_router.put('/update-tag/:id',tagController.update_tag);

tag_router.delete('/delete-tag/:id',tagController.delete_tag);






module.exports = tag_router;