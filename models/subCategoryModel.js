const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
    category_id:{
        type:String,
        require:true
    },
    sub_category:{
        type:String,
        require:true
    },
    images:{
        type:String,
        require:true
    },    
});


module.exports =  mongoose.model("subCategory", subcategorySchema);




