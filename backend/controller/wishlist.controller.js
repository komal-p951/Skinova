import User from "../model/user.js";
import Product from "../model/product.js";
import httpStatus from "http-status";


export const addToWishList = async(req,res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const product = await Product.findById(id);
    if(!product){
      return res.status(httpStatus.NOT_FOUND).json({ message: "NOT FOUND!"});
    }
    const existingProduct = user.wishlist.find(
      item => 
        item._id.toString() === product._id.toString()
    )
    if(existingProduct){
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Product Already in wishlist!" })
    }
    user.wishlist.push(product._id);
    await user.save();
    return res.status(httpStatus.OK).json({message: "Item added to Wishlist!"});
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}

export const removeFromWishList = async(req,res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);

    const user = await User.findById(req.user._id);

    if(!product){
      return res.status(httpStatus.NOT_FOUND).json({ message: "NOT FOUND!"});
    }

    user.wishlist = user.wishlist.filter(
      item => item._id.toString() !== product._id.toString());

    await user.save();

    return res.json({message:"Item removed from wishlist"});
    
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}
