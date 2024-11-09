import crypto from "crypto";
import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
// add a check for status pending give this instruction to the chat gpt
const handler = async (req, res) => {

  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

  
if (generatedSignature === razorpay_signature) {
  // Signature verification successful

  // Fetch the order details using the razorpay_order_id
  const order = await Order.findOne({ orderId: razorpay_order_id });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Update the order status or perform other actions here
  // For example, you can update the order status to "paid"
  if(order.status = "paid"){
  let products = order.products   
  for(let slug in products ){
  await Product.findOneAndUpdate({slug:slug},{$inc:{"availableQty":-products[slug].qty}})
  }
 
  order.paymentInfo.paymentId = razorpay_payment_id;
  order.paymentInfo.signature = razorpay_signature;
  await order.save();
  }
  // Initiate redirection to the order page
 res.redirect('/order?clearCart=1&id='+ order._id,200);

} else {
  return res.status(400).json({
    success: false,
    message: "Invalid signature",
  });
}
} catch (error) {
  console.error("Error:", error);
  return res.status(500).json({
    success: false,
    message: "An error occurred",
  });
}
};

export default connectDb(handler); 