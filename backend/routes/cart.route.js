import { Router } from'express'
import { isLogginUser } from '../middleware/islogginUser.js';
import { addToCart, deleteFromCart } from '../controller/cart.controller.js';


const router = Router();

router.route("/:id/cart")
    .post(isLogginUser,addToCart)
    .delete(isLogginUser,deleteFromCart);

export default router;