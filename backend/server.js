import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import reviewRouter from "./routes/productReview.route.js";
import cartRouter from "./routes/cart.route.js";
import wishListRouter from "./routes/wishlist.route.js";
import orderRouter from "./routes/order.route.js";
import cors from 'cors';
dotenv.config();


const app = express();
app.use(express.json()); 
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.get("/health", (req,res) => {
    return res.json({message: 'server is working....'})
})
app.use("/wishlist",wishListRouter);
app.use("/cart",cartRouter);
app.use("/reviews",reviewRouter);
app.use("/order",orderRouter);
app.use("/",userRouter);



const MONGO_URL = process.env.MONGO_URL;

const start = async() => {
    const connectDB = await mongoose.connect(MONGO_URL);
    const PORT = process.env.PORT || 9090;
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
}

start();