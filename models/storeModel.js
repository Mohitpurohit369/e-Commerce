const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
    vendor_id:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    vendor_id:{
        type:String,
        require:true
    },
    logo:{
        type:String,
        require:true
    },
    business_email:{
        type:String,
        require:true
    },
    pin:{
        type:String,
        require:true
    },
    location:{
       type:{ 
        type:String,
        require:true
    },
        coordinates:[]
    },
    
});
storeSchema.index({location:"2dsphere"});

module.exports =  mongoose.model("store", storeSchema);
