const buy_prod = require("../models/buyproductModule");
const buy_product = async (req, res) => {
    try {

        const buy_product_obj = new buy_prod({
            product_id: req.body.product_id,
            customer_id: req.body.customer_id,
            transection_id: req.body.transection_id,
            vendor_id: req.body.vendor_id,
            store_id: req.body.store_id
        });
        const buy_product_data = await buy_product_obj.save();

        res.status(200).send({success:true,meassage:"add card",data:buy_product_data});
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    buy_product
}