import httpStatus from "http-status";
import User from "../model/user.js";
import Order from "../model/order.js";
import Product from "../model/product.js";

export const createNewOrder = async(req,res) => {
    try {
        const {data} = req.body;

        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({ message:"User Not Found!" });
        }
        console.log("data = ",data);
        // const order = new Order({
        //     user: data.user._id,
        //     products:[{
        //         product:data.product,
        //         quantity:data.product.quantity,
        //         price: data.price
        //     }],
        //     PaymentMethod: data.method,
        //     total: data.total
        // });
        
        // await order.save();

        return res.json({message : 'data saved '});
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({message: error.message});
    }
}