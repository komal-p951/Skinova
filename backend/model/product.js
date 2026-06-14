import mongoose from "mongoose";
import ProductReview from "./productReview.js";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Skincare",
        "Makeup",
        "Haircare",
        "Fragrance",
        "Bath & Body",
        "Tools & Accessories",
        "Supplements",
      ],
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        filename: String,
      },
    ],
    quantity:{
      required:true,
      type:Number,
    },
    SkinType: {
      type: String,
      enum: [
        "Dry",
        "Oily",
        "Sensitive",
        "Combination",
        "Normal"
      ]
    },
    ingredients: [String],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductReview",
      },
    ],
  },
  { timestamps: true }
);

productSchema.post(
   "findOneAndDelete",
   async function(product){

      if(product){
         await ProductReview.deleteMany({
            _id:{ $in: product.reviews }
         });
      }

   }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
