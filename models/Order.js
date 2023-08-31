// getting-started.js
const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentInfo: {
    paymentId: { type: String, default: "" },
    signature: { type: String, default: "" },
  },
  products: { type: Object, required: true },
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
  phone: { type: Number, required: true },
  amount: { type: Number, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  status: { type: String, default: "Initiated", required: true },
  deliveryStatus: { type: String, default: "unshipped", required: true },
  paymentMethod: { type: String, required: true },
  // Add paymentMethod field
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model("Order", OrderSchema);


