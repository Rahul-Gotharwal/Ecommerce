import User from "@/models/User"
import connectDb from "@/middleware/mongoose"
const jwt = require ('jsonwebtoken')
import { runCors } from "../lib/cors"
const handler= async(req, res) =>{
    await runCors(req, res);
    if(req.method=="POST"){
        let token = req.body.token
        let user = jwt.verify(token , process.env.JWT_SECRET)
        let dbuser = await User.findOne({email:user.email})
        const {name,email,pincode,address,phone} = dbuser
        res.status(200).json({name , email,phone,pincode,address})
    }
    else{
        res.status(400).json({ error:"error" })
    }
    
  }
  export default connectDb(handler)