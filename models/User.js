const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        name:{type:String,require:true},
        email: { 
            type: String,
            required: true,
            unique: true },
        password: { type: String, required: true },
        image:{type:String,require:true},
        mobile:{type:Number,require:true},
        type:{
            type:Number,
            require:true
        },
        token:{
            type:String,
            default:''

        }
    // cart: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: Number }]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
