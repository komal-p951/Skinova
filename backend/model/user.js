import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Please provide a valid phone number"],
    },
    address: {
      street: {type: String},
      city: {type: String},
      state: {type: String},
      country: {type: String},
    },
    profileImage: {
      url: String,
      filename: String,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "author"],
      default: "customer",
    },
    token:{
      type:String,
      default:''    
    }
    // orders:[
    //   {
    //     product: {
    //       type: Schema.Types.ObjectId,
    //       ref:"Product"
    //     }
    //   }
    // ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;


    // reviews: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "ProductReview",
    //   },
    // ],
    // products: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],
    // categories: [
    //   {
    //     type: String,
    //   },
    // ],
    // ratings: {
    //   average: {
    //     type: Number,
    //     default: 0,
    //     min: 0,
    //     max: 5,
    //   },
    //   count: {
    //     type: Number,
    //     default: 0,
    //   },
    // },