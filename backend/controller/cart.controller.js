import User from "../model/user.js";
import Product from "../model/product.js";
import httpStatus from "http-status";

export const getCartProducts = async(req,res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "cart.product",
      populate:{
        path:"reviews"
      }
    });
    return res.status(httpStatus.OK).json(user.cart);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}

export const addToCart = async(req,res) => {
  try {
    const { id } = req.params;
    const {quantity} = req.body;
    const user = await User.findById(req.user._id);
    const product = await Product.findById(id);
    if(!product){
      return res.status(httpStatus.NOT_FOUND).json({ message: "NOT FOUND!"});
    }
    
    const existingProduct = user.cart.find(
      item => 
        item.product.toString() === product._id.toString()
    );
    if(existingProduct){
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Product Already in cart!" });
    }
    user.cart.push({
      product: product._id,
      quantity: quantity
    });
    await user.save();
    return res.status(httpStatus.OK).json({message: "Item Added in Cart!"});
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

export const deleteFromCart = async(req,res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    if(!user){
      return res.status(httpStatus.NOT_FOUND).json({message: "User not found!"});
    }
    const product = await Product.findById(id);
    if(!product){
      return res.status(httpStatus.NOT_FOUND).json({message:"Product Not Found!"});
    }
    user.cart = user.cart.filter(
      item => 
        item.product.toString() !== product._id.toString()
    )
    await user.save();
    return res.status(httpStatus.OK).json({message: "Removed From Cart!"});
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}


