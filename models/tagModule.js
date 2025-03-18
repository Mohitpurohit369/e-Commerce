const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    "name":{
        type:String
    }
}, { timestamps: true })

module.exports =  mongoose.model("tagName", tagSchema);