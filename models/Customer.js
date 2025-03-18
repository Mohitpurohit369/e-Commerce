const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
}, { timestamps: true });

module.exports = mongoose.model("Customer", CustomerSchema);
