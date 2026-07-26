import httpStatus from "http-status";
import User from "../model/user.js";
import Order from "../model/order.js";
import Product from "../model/product.js";

export const createNewOrder = async(req,res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(user);
        const {
            products,
            subtotal,
            discount,
            shippingCharge,
            total,
            paymentMethod
        } = req.body;

        if(products.length === 0) {
            return res.status(400).json({
                message: "Products required"
            })
        }

        const order = new Order({
            user: user._id,
            products,
            subtotal,
            discount,
            shippingCharge,
            total,
            paymentMethod,
            // subtotal:subTotal
        });
        // const order = new Order({
        //     user: req.user.id,
        //     products,
        //     subtotal,
        //     discount,
        //     shippingCharge,
        //     total,
        //     paymentMethod
        // });

        user.cart = [];
        await order.save();
        await user.save();

        return res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({message: error.message});
    }
}

export const getMyOrders = async(req,res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message: "User Not Found!"});
        }

        const getAllOrders = await Order.find({user: user._id}).populate({
            path:"products.product",
            model:"Product"
        });
        
        return res.json({message: "Success!", order:getAllOrders});

    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({message: error.message});
    }
}

export const getOrder = async(req,res) => {
    try {
        const orderId = req.params.id;
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message: "User Not Found!"});
        }

        const orderData = await Order.findById(orderId).populate("user")
           .populate("products.product");
        if(!orderData){
            return res.status(httpStatus.NOT_FOUND).json({message:"No order found!"});
        }

        return res.json({message:"successfully data fetched !", order:orderData});

    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({message: error.message});
    }
}

export const getAllOrders = async(req,res) => {
    try {

        const userId  = req.user.id;

        const user = await User.findById(userId);
        const orders = await Order.find();

        if(!user) return res.status(404).json({message: "User Not Found!"});
        if(user.role === "author"){
            return res.json({orders});
        }
        return res.status(httpStatus.UNAUTHORIZED).json({"message":"unauthorized request !"});
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({message: error.message});
    }
}