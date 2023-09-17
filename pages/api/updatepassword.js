import User from "@/models/User"
import connectDb from "@/middleware/mongoose"
const jwt = require ('jsonwebtoken')
import CryptoJS from "crypto-js"
const handler= async(req, res) =>{
    if(req.method=="POST"){
        let token = req.body.token
        let user = jwt.verify(token , process.env.JWT_SECRET)
        let dbuser =await User.findOne({email:user.email})
        const  bytes  = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        let  decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if(decryptedPass==req.body.password&& req.body.npassword==req.body.cpassword){
        let dbuseru = await User.findOneAndUpdate({email:user.email},{password:CryptoJS.AES.encrypt(req.body.cpassword,process.env.AES_SECRET).toString()})
        res.status(200).json({success:true})
        return
        }
        res.status(200).json({success:false})
    }
    else{
        res.status(400).json({ error:"error" })
    }
    
  }
  export default connectDb(handler)