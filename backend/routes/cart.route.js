import { Router } from'express'
import { isLogginUser } from '../middleware/islogginUser.js';
import { addToCart, deleteFromCart, getCartProducts } from '../controller/cart.controller.js';


const router = Router();
router.route("/").get(isLogginUser,getCartProducts);
router.route("/:id")
.post(isLogginUser,addToCart)
.delete(isLogginUser,deleteFromCart);

export default router;