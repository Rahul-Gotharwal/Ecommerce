import Razorpay from "razorpay";
import shortid from "shortid";
import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import pincodes from '../../pincodes.json'
import { runCors } from "../lib/cors";

const handler = async (req, res) => {
  await runCors(req, res);
  if (req.method === "POST") {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: shortid.generate(),
    };

    instance.orders.create(options, async function (err, razorpayOrder) {
      if (err) {
        return res.status(500).json({ success: false, error: "Failed to create an order or add some items to your cart" });
      } else {
        try {
          if (!Object.keys(pincodes).includes(req.body.pincode)) {
            res.status(200).json({ success: false, error: "Pincode is not serviceable!" });
            return;
          }

          let product , sumTotal=0;
          let cart = req.body.cart
          if(req.body.amount<=0){
            res.status(200).json({success:false,"error":"Add items to your cart!"})
            return
          }
          for(let item in cart ){
            sumTotal+=cart[item].price*cart[item].qty
            product= await Product.findOne({slug:item})
            if(product.availableQty<cart[item].qty){
              res.status(200).json({success:false,"error":"this item is out of stock!"})
              return
            }
            
            if(product.price!=cart[item].price){
              res.status(200).json({success:false,"error":"the price is changed"})
              return
            }
          }
          if(sumTotal!==req.body.amount){
            res.status(200).json({success:false,"error":"the price is changed"})
            return
          }
        
          if(req.body.pincode.length!==6){
            res.status(200).json({success:false,"error":"Please enter your 6 digit pincode!"})
            return
          }

          // Validation checks
          if (req.body.paymentMethod === "cod") {
            // Handle Cash on Delivery logic
            const newOrder = new Order({
              email: req.body.email,
              name: req.body.name,
              address: req.body.address,
              phone: req.body.phone,
              pincode: req.body.pincode,
              amount: req.body.amount,
              state: req.body.state,
              city: req.body.city,
              orderId: shortid.generate(), // Generate a unique ID for COD orders
              products: req.body.cart,
              paymentMethod: "Cash on Delivery", // Indicate the payment method
            });

            // Save the newOrder to your database
            await newOrder.save();
            for (const slug in cart) {
              const product = await Product.findOne({ slug });
              if (product) {
                await Product.findOneAndUpdate(
                  { slug },
                  { $inc: { availableQty: -cart[slug].qty } }
                );
              }
            }

            const responseData = {
              success: true,
              additionalInfo: newOrder,
            };

            return res.json(responseData);
          } else{
           
          if(!Object.keys(pincodes).includes(req.body.pincode)){
            res.status(200).json({success:false,"error":"Pincode is not serviceable!"})
            return
          }
          // Create a new instance of your Order model
          let product , sumTotal=0;
          let cart = req.body.cart
          if(req.body.amount<=0){
            res.status(200).json({success:false,"error":"Add items to your cart!"})
            return
          }
          for(let item in cart ){
            sumTotal+=cart[item].price*cart[item].qty
            product= await Product.findOne({slug:item})
            if(product.availableQty<cart[item].qty){
              res.status(200).json({success:false,"error":"this item is out of stock!"})
              return
            }
            
            if(product.price!=cart[item].price){
              res.status(200).json({success:false,"error":"the price is changed"})
              return
            }
          }
          if(sumTotal!==req.body.amount){
            res.status(200).json({success:false,"error":"the price is changed"})
            return
          }
          
          if(req.body.pincode.length!==6){
            res.status(200).json({success:false,"error":"Please enter your 6 digit pincode!"})
            return
          }
          
          const newOrder = new Order({
            email: req.body.email,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            pincode: req.body.pincode,
            amount: req.body.amount,
            state:req.body.state,
            city:req.body.city,
            orderId: razorpayOrder.id,
            products: req.body.cart,
            paymentMethod: "Online Payment",
            paymentInfo: {
              paymentId: "", // Initialize empty, will be filled after payment
              signature: "", // Initialize empty, will be filled after payment
            },
            // Other fields you want to include
          });

          // Save the newOrder to your database
          await newOrder.save();

          // Now, return the response with the order details and additional info
          const responseData = {
            success: true,
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            additionalInfo: newOrder,
          };

          // Send back the response to the client
          responseData.success = true;
          return res.json(responseData);
        
          }
        } catch (error) {
          console.error("Error processing order:", error);
          return res.status(500).json({ success: false, error: "Failed to process the order" });
        }
      }
    });
  }
};

export default connectDb(handler);
