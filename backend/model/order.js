import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price:{
            type:Number,
            required:true
        }
    }],
    paymentMethod:{
        type:String,
        enum:["COD","ONLINE"]
    },
    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed"],
        default: "Pending"
    },
    orderStatus:{
        type:String,
        enum:["Placed","Shipped","Out For Delivery" ,"Deliverd","Cancelled","Returned"],
        default:"Placed"
    },
    total:{
        type:Number,
    },
},{timestamps:true}
);

const Order = new mongoose.model("Order",OrderSchema);
export default Order;