import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import reviewRouter from "./routes/productReview.route.js";
import cartRouter from "./routes/cart.route.js";
import wishListRouter from "./routes/wishlist.route.js";

dotenv.config();


const app = express();
app.use(express.json()); 
app.use("/skinova",userRouter);
app.use("/skinova",wishListRouter);
app.use("/skinova",cartRouter);
app.use("/skinova",reviewRouter);


const MONGO_URL = process.env.MONGO_URL;

const start = async() => {
    const connectDB = await mongoose.connect(MONGO_URL);
    app.listen(9090,() => {
    console.log(`server running on port ${9090}`);
   })
}

start();