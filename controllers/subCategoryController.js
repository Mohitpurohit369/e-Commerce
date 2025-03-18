const SubCategory = require('../models/subCategoryModel');
// const User = require('../models/User');



// create_subcategory

//  const create_subcategory = async (req,res) => {
//     try {
//         const check_sub = await SubCategory.find({category_id:req.body.category_id});
//         if(check_sub.length > 0){
//             let checking = false;
//             for (let i = 0; i < check_sub.length; i++) {
//                           if (check_sub[i]['category'].toLowerCase() === req.body.category.toLowerCase()) {
//                               check = true;
//                               break;
//                           }

//                       }

//                       if (check == false) {
//                           // Sub Create new category
//                           const sub_category =  new SubCategory ({
//                             category_id:req.body.category_id,
//                             sub_category:req.body.sub_category,
//                             images:req.file.filename

//                         })

//                         const sub_cate_data = sub_category.save();
//                         res.status(200).send({success:true,msg:"Sub category Details",data:sub_cate_data});
//                       }
//                       else{
//                           res.status(200).send({ success: true, msg: "this Sub Categroy ("+ req.body.sub_category+") is already exists"});
//                       }

//         }
//         else {
//             // Sub Create new category
//             const sub_category =  new SubCategory ({
//                 category_id:req.body.category_id,
//                 sub_category:req.body.sub_category
//             })

//             const sub_cate_data = sub_category.save();
//             res.status(200).send({success:true,msg:"Sub category Details",data:sub_cate_data});
//         }

//     } catch (error) {
//         res.status(400).send({success:false,msg:error.message});
//     }
// } 

const create_subcategory = async (req, res) => {
    try {
        const { category_id, sub_category } = req.body;
        const existing_subcategories = await SubCategory.find({ category_id });

        if (existing_subcategories.length > 0) {
            let exists = existing_subcategories.some(
                (sub) => sub.sub_category.toLowerCase() === sub_category.toLowerCase()
            );

            if (exists) {
                return res.status(200).send({
                    success: true,
                    msg: `This Sub Category (${sub_category}) already exists`
                });
            }
        }

        // Create new subcategory
        const newSubCategory = new SubCategory({
            category_id,
            sub_category,
            images: req.file ? req.file.filename : null // Handle cases where no image is uploaded
        });

        const savedSubCategory = await newSubCategory.save();
        res.status(200).send({ success: true, msg: "Subcategory created successfully", data: savedSubCategory });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};


// 📌 2️⃣ **Get All Subcategories**

const getall_subcategory = async (req, res) => {
    try {
        const subcategories = await SubCategory.find();
        res.status(200).json({ success: true, data: subcategories });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}


// 📌 3️⃣ **Get Subcategories by Category ID**

const getBY_id = async (req, res) => {
    try {
        const { category_id } = req.params;
        const subcategories = await SubCategory.find({ category_id });

        if (subcategories.length === 0) {
            return res.status(404).json({ success: false, msg: "No subcategories found for this category." });
        }

        res.status(200).json({ success: true, data: subcategories });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}

// 📌 4️⃣ **Update Subcategory**

const update_subcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { sub_category } = req.body;

        const updatedData = {
            sub_category,
            images: req.file ? req.file.filename : undefined, // Only update image if a new one is provided
        };

        const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedSubCategory) {
            return res.status(404).json({ success: false, msg: "Subcategory not found." });
        }

        res.status(200).json({ success: true, msg: "Subcategory updated successfully", data: updatedSubCategory });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}


// 📌 5️⃣ **Delete Subcategory**

const subcategory_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

        if (!deletedSubCategory) {
            return res.status(404).json({ success: false, msg: "Subcategory not found." });
        }

        res.status(200).json({ success: true, msg: "Subcategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}
module.exports = {
    create_subcategory,
    getall_subcategory
}