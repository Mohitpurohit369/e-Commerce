const Category = require('../models/categroyModel');

const add_category = async (req, res) => {
    try {
        // Validate input
        if (!req.body.category) {
            return res.status(400).send({ success: false, msg: "Category is required" });
        }

        // Check for existing category
        // const existingCategory = await Category.findOne({ category: req.body.category });
        // if (existingCategory) {
        //     return res.status(400).send({ success: false, msg: "Category already exists" });
        // }

        const category_data = await Category.find();
        if (category_data.length > 0) {
            let check = false;
            for (let i = 0; i < category_data.length; i++) {
                if (category_data[i]['category'].toLowerCase() === req.body.category.toLowerCase()) {
                    check = true;
                    break;
                }

            }

            if (check == false) {
                // Create new category
                const category = new Category({ 
                    category: req.body.category, 
                    // images:req.file.filename
                    images:req.file.filename
                 });
                console.log("New Category:", category);

                const cate_data = await category.save();
                console.log("Saved Category:", cate_data);
                res.status(200).send({ success: true, msg: "Category Data",data:cate_data });
            }
            else{
                res.status(200).send({ success: true, msg: "this Categroy ("+ req.body.category+") is already exists"});
            }
            // return res.status(400).send({ success: false, msg: "Category already exists" });
        }
        else {
            // Create new category
            const category = new Category({ category: req.body.category });
            console.log("New Category:", category);

            const cate_data = await category.save();
            console.log("Saved Category:", cate_data);
            res.status(200).send({ success: true, msg: "Category Data",data:cate_data });
        }
        
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
};

const get_category = async (req,res)=>{
    try {
        return Category.find();
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }

}

// Get all categories
const getall_category =  async (req, res) => {
    try {
        const categories = await Category.find();
        console.log("here data cat",categories);
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};



module.exports = {
    add_category,
    get_category,
    getall_category
};
