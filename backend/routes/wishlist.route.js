import { Router } from "express";
import { isLogginUser } from "../middleware/islogginUser.js";
import { addToWishList, getWishListProduct, removeFromWishList } from "../controller/wishlist.controller.js";

const router = Router();

// router.route("/add-to-cart").post(isLogginUser, addAllListProductstocart);
router.route("/").get(isLogginUser,getWishListProduct);
router.route("/:id")
    .post(isLogginUser,addToWishList)
    .delete(isLogginUser,removeFromWishList);


export default router;