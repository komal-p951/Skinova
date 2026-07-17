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

app.use("/skinova/wishlist",wishListRouter);
app.use("/skinova/cart",cartRouter);
app.use("/skinova/reviews",reviewRouter);
app.use("/skinova/order",orderRouter);
app.use("/skinova",userRouter);


const MONGO_URL = process.env.MONGO_URL;

const start = async() => {
    const connectDB = await mongoose.connect(MONGO_URL);
    app.listen(9090,() => {
    console.log(`server running on port ${9090}`);
   })
}

start();