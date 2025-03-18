const Add_card = require("../models/addtocardModule");

const add_to_card = async (req, res) => {
    try {
        const card_obj = await new Add_card({
            product_id: req.body.product_id,
            price: req.body.price,
            vendor_id: req.body.vendor_id,
            store_id: req.body.store_id
        });
        const card_data = await card_obj.save();
        res.status(200).send({success:true,meassage:"add card",data:card_data});

    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
}

module.exports = {
    add_to_card
}