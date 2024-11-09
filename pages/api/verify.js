import Razorpay from "razorpay";
import { runCors } from "../lib/cors";
export default async function handler(req, res) {
  await runCors(req, res);
  const check = Razorpay.validateWebhookSignature(
    JSON.stringify(req.body),
    req.headers["x-razorpay-signature"],
    process.env.RAZORPAY_WEBHOOK_SECRET
  );
  if (check) {
    //save data in database and this data provide you payment status and payment details
    require("fs").writeFileSync(
      "paymentInfoData.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    //Do something
  }
  res.json({ status: "ok" });
}