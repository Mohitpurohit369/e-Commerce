
const Category = require('../models/categroyModel');
const Product = require('../models/Product');
const User = require('../models/User');
const Subcategory = require('../models/subCategoryModel');

const commom_data = async (req,res) =>{
    try {
        const count_data = [];

        const product_data = await Product.find().countDocuments();
        const vendor_data = await User.find({type:1}).countDocuments();
        const category_data = await Category.find().countDocuments();
        const sub_category = await Subcategory.find().countDocuments();

        count_data.push({
            product:product_data,
            vendor:vendor_data,
            category:category_data,
            sub_category:sub_category

        })

        res.status(200).send({success:true,message:"Counting Data",data:count_data})
        
    } catch (error) {
        res.status(400).send({success:false,message:error.message});
    }
}
module.exports = {
    commom_data
}