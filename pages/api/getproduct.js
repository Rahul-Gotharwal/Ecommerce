import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"
const handler = async (req,res )=>{
    let products = await Product.find()
    let badsheet = {}
    for(let item of products){
      if(item.title in badsheet){
      if(!badsheet[item.title].color.includes(item.color) && item.availableQty>0){
        badsheet[item.title].color.push(item.color)
      }
      if(!badsheet[item.title].size.includes(item.size) && item.availableQty>0){
        badsheet[item.title].size.push(item.size)
      }
      }
      else{
          badsheet[item.title] =JSON.parse(JSON.stringify(item))
          if(item.availableQty>0){
            badsheet[item.title].color = [item.color]
            badsheet[item.title].size = [item.size]
          }
      }
    }
    res.status(200).json({badsheet}) 
}

export default connectDb(handler)