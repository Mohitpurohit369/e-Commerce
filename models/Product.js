const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    // name: { type: String, required: true },
    // desc: { type: String },
    // banner: { type: String },
    // type: { type: String },
    // unit: { type: Number, required: true },
    // price: { type: Number, required: true },
    // available: { type: Boolean, default: true },
    // supplier: { type: String }

    // vendore_id: {
    //     type: String,
    //     required: true
    // },
    // store_id: {
    //     type: String,
    //     required: true
    // },
    // name: {
    //     type: String,
    //     required: true
    // },
    // price: {
    //     type: String,
    //     required: true
    // },
    // discount: {
    //     type: String,
    //     required: true
    // },
    // vendore_id: {
    //     type: String,
    //     required: true
    // },
    // product_code: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // select_size: {
    //      type: String, 
    //      required: true 
    //     },
    // total_products: { 
    //     type: Number, 
    //     required: true
    //  },
    // description: { 
    //     type: String, 
    //     required: true
    //  },


    // name: {
    //     type: String,
    //     required: true
    // },
    // price: {
    //     type: Number,
    //     required: true
    // },
    // discount: {
    //     type: Number,
    //     default: 0
    // },
    // category_id: {
    //     type: String,
    //     required: true
    // },
    // sub_category_id: {
    //     type: String,
    //     required: true
    // },
    // images: {
    //     type: Array,
    //     validate: [arrayLimit, "you can pass only 5 product images"],
    //     require: true
    // },
    // product_code: {
    //         type: String,
    //         required: true,
    //         unique: true
    //     },
    // select_size: {
    //     type: String,
    //     required: true
    // },
    //  total_products: { 
    //     type: Number, 
    //     required: true
    //  },
    // description: { 
    //     type: String, 
    //     required: true
    //  },



    name: { type: String, required: true },
    title: { type: String, required: true },
    productCode: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    discount: { type: Number },
    size: { type: String },
    color: { type: String },
    tag: { type: String },
    
    category_id: {
      type: String,
      required: true
    },
    sub_category_id: {
      type: String,
      required: true
    },
    
    // images: {
    //   type: [String], // Ensures images are stored as an array of strings
    //   validate: {
    //     validator: function (val) {
    //       return val.length <= 5;
    //     },
    //     message: "You can upload a maximum of 5 images"
    //   },
    //   required: true
    // },
    images: {
            type: Array,
            validate: [arrayLimit, "you can pass only 5 product images"],
            require: true
        },
        productCode: {
      type: String,
      required: true,
      unique: true
    },
  
    total_products: {
      type: Number,
      required: true
    },
  
    description: {
      type: String,
      required: true
    }
  }, { timestamps: true });


function arrayLimit(val) {
    return val.length <= 5;

}

module.exports = mongoose.model("Product", ProductSchema);
