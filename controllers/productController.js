const Product = require("../models/Product");
const Category_controller = require("../controllers/categoryController");
const Store_controller = require("../controllers/storeController");

// ✅ Create a Product

exports.createProduct = async (req, res) => {
    try {
        let arrImages = req.files.map(file => file.filename);

        const product = new Product({
            name: req.body.name,
            title: req.body.title,
            productCode: req.body.productCode,
            price: req.body.price,
            salePrice: req.body.salePrice,
            discount: req.body.discount,
            size: req.body.size,
            color: req.body.color,
            tag: req.body.tag,
            category_id: req.body.category_id,
            sub_category_id: req.body.sub_category_id,
            images: arrImages,
            total_products: req.body.total_products,
            description: req.body.description    
        });

        const productData = await product.save();
        res.status(200).json({ success: true, message: "Product created successfully", data: productData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Products
exports.getProductById = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send({success:false, message: error.meassge,});
    }
};

// ✅ Get Product by ID
exports.getAllProducts = async (req, res) => {
    try {
        var send_data = [];
        var cat_data = await Category_controller.get_category();
        if(cat_data.length > 0){
            
            for(let i=0;i<cat_data.length;i++){
                
                var product_data = [];
                var cat_id = cat_data[i]["_id"].toString();
                var cat_pro = await Product.find( {category_id:cat_id});
                if(cat_pro.length>0){
                   
                    for(let j=0;i<cat_pro.length;j++){  
                        
                        var store_data = await Store_controller.get_store(cat_pro[j]['store_id']);
                       product_data.push({
                        "product_name":cat_pro[j]["name"],
                        "images":cat_pro[j]["images"],
                        "store_address":store_data['address']
                       });
                    }
                }
                console.log('here');
                send_data.push({
                    "category":cat_data[i]["categroy"],
                    "product": product_data
                });
            }
            res.send(200).send({success:true,msg:"product deatils",data:send_data});            
        }
        else{
            res.status(200).send({success:false, message: "product deatils",data:send_data});
        } 
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Update a Product
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, stock },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Delete a Product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


exports.search_product = async (req,res) => {
    try {

        var search = req.body.search;

        var product_data = await Product.find({"name":{ $regex: ".*"+search+".*",$options:'i'}}); 
        if(product_data.length > 0){
            res.status(200).send({success:true, message: "Product Details",data:product_data});
        }
        else{
            res.status(200).send({success:false, message: "Product data not found!",});
        }
    } catch (error) {
        res.status(500).send({success:false, message: error.meassge,});
    }
}


