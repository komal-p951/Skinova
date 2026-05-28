import { Router } from "express";
import { isLogginUser } from "../middleware/islogginUser.js";
import { addToWishList, removeFromWishList } from "../controller/wishlist.controller.js";

const router = Router();

router.route("/:id/wishlist").post(isLogginUser,addToWishList);
router.route("/:id/wishlist").delete(isLogginUser,removeFromWishList);


export default router;