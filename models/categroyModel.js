// const mongoose = require("mongoose");

// const categorySchema = mongoose.Schema({
//     category:{
//         type:String,
//         require:true
//     }    
// });


// module.exports =  mongoose.model("Category", categorySchema);
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,  // Fixed typo (require → required)
        trim: true,
        unique: true
    },
    images:{
        type:String,
        require:true
    },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);

