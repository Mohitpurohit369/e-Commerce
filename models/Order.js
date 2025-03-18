const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    orderId: { type: String, required: true, unique: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" },
    txnId: { type: String, required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        unit: { type: Number, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
