import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
import { runCors } from "../lib/cors";
const handler = async (req, res) => {
  await runCors(req, res);
  if (req.method == "POST") { 
    const{ name,email} = req.body
   let u = new User({name ,email,password :CryptoJS.AES.encrypt(req.body.password,process.env.AES_SECRET).toString()})
    await u.save()
    res.status(200).json({ success:"success"})
  } else {
    res.status(400).json({ error: "This method is not allowed " });
  }
};

export default connectDb(handler);
