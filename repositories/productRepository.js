const Product = require("../models/Product");

exports.getAllProducts = async () => await Product.find();
exports.getProductById = async (id) => await Product.findById(id);
exports.createProduct = async (data) => await Product.create(data);
exports.updateProduct = async (id, data) => await Product.findByIdAndUpdate(id, data, { new: true });
exports.deleteProduct = async (id) => await Product.findByIdAndDelete(id);
