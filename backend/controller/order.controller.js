import httpStatus from "http-status";
import User from "../model/user.js";
import Order from "../model/order.js";
import Product from "../model/product.js";

export const createNewOrder = async(req,res) => {
    try {
        const { paymentMethod } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId).populate("cart.product");
        if(!user.cart.length){
            return res.status(400).json({
                message:"Cart is empty"
            });
        }
        const products = user.cart.filter((item) => item.product !== null).map((item) => ({
            product: item?.product?._id,
            quantity: item?.quantity,
            price: item?.product?.price 
        }));

        let subTotal = products.reduce((acc, product) => acc + (product?.price * product?.quantity), 0);

        const discount = subTotal >= 1000 ? subTotal * 0.05 : 0;
        const shipping = subTotal >= 750 ? 0 : 40;
        const total = subTotal + shipping - discount;

        const order = new Order({
            user: userId,
            products,
            discount,
            shippingCharge:shipping,
            total,
            paymentMethod,
            subtotal:subTotal
        });

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