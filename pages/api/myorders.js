import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
const jwt = require ('jsonwebtoken')
import { runCors } from "../lib/cors";

const handler = async (req, res) => {
  await runCors(req, res);
  const token = req.body.token 
  const data = jwt.verify(token, process.env.JWT_SECRET);
  
  try {
    const orders = await Order.find({
      email: data.email,
      $or: [{ status: "paid" }, { status: "pending" }, { status: "Initiated" }],
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
}

export default connectDb(handler);
