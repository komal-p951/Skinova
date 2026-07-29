import httpStatus from "http-status";
import User from "../model/user.js";
import Order from "../model/order.js";
import Product from "../model/product.js";

export const createNewOrder = async(req,res) => {
    try {
        const user = await User.findById(req.user.id);
        // console.log(user);
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

        products.forEach(async(product) => {
            let id = product.product;
            let prod = await Product.findById(id);
            if(!prod)return res.json("no such product !");
            prod.quantity -= product.quantity;
            prod.sold += product.quantity;
            await prod.save();

        });

        console.log("my products is", products);
        // console.log("my products is", products.map.quantity);
        // const id = products[0]?.product;
        // console.log("my product id is :" , id);

        // const product = await Product.findById(id);
        // console.log(product)

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

        user.cart = [];
        await order.save();
        await user.save();
        // await product.save();

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

        const userId  = req.admin.id;

        const user = await User.findById(userId);
        const orders = await Order.find().populate("user");

        if(!user) return res.status(404).json({message: "User Not Found!"});
        return res.json({orders});
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({message: error.message});
    }
}