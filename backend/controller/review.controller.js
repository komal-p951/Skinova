import Product from "../model/product.js";
import ProductReview from "../model/productReview.js";
import User from "../model/user.js";
import httpStatus from "http-status";

export const addReview = async(req,res) => {
    try {
        const product  = await Product.findById(req.params.productId);

        const{rating,comment} = req.body;

        if(!product){
            return res.status(httpStatus.NOT_FOUND).json({message: "Product Not Found!"});
        }
        const newReview = new ProductReview({
            user: req.user._id,
            product: product._id,
            rating: rating,
            comment: comment
        });
        await newReview.save();
        product.reviews.push(newReview._id);
        await product.save();

        return res.json({message:"Review added"});
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({message: error.message});
    }
}

export const deleteReview = async(req,res) => {
    try {
        const { productId, reviewId } = req.params;
        const review = await ProductReview.findById(reviewId);
        const isOwner = review.user.toString() === req.user._id.toString();

        const isAdmin = req.user.role === "author";
        if(!isOwner && !isAdmin){
            return res.status(httpStatus.BAD_REQUEST).json({message: "UnAuthorized!"});
        }
        const product = await Product.findByIdAndUpdate(productId,{ $pull : {reviews : reviewId}},{ new: true });

        if (!product) {
        return res.status(httpStatus.NOT_FOUND).json({
           message: "Product not found",
        });
        }
    
    await ProductReview.findByIdAndDelete(reviewId);
    return res.status(httpStatus.OK).json({message: "review deleted!"});

    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({message: error.message});
    }
}

