const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  key: { type: String },
  title: { type: String, required: true },
  slug: { type: String, required: true,unique:true },
  desc: { type: String, required: true },
  img: { type: mongoose.Schema.Types.Mixed },
  category: { type: String, required: true },
  price:{type:Number,required:true},
  size: { type: String, required: true },
  color:{type: String},
  availableQty:{type:Number,required:true},
},{timestamps:true});
mongoose.models = {}
export default mongoose.model("Product",ProductSchema);
