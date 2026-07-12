import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        type : Schema.Types.ObjectId,
        ref : "Product"
    },
    quantity:{
        type:Number
    },
    paymentMethod:{
        type:String,
        enum:["COD","ONLINE"]
    },
    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed","Refunded"]
    },
    orderStatus:{
        type:String,
        enum:["Pending","Shipped","Out For Delivar" ,"Deliverd","Cancelled","Returned"],
        default:"Pending"
    },
    total:{
        type:Number,
    },
},{timestamps:true}
);

const Order = new mongoose.model("Order",OrderSchema);
export default Order;