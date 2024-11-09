import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { runCors } from "./lib/cors";
const handler = async (req, res) => {
  await runCors(req, res);
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ success: false, error: "No Account Found! Create it" });
      }

      const decryptedPass = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);

      if (password !== decryptedPass) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET);

      return res.status(200).json({ success: true, token, email: user.email });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ success: false, error: "An error occurred during login" });
    }
  } else {
    return res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);

