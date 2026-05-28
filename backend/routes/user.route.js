import { Router } from'express'
import { addProduct, deleteProduct, editProduct, getAllProducts, getProduct, getProductsByCategory, loginUser, RegisterUser } from '../controller/user.controller.js';
import { authAdmin } from '../middleware/isAuthor.js';
import { addReview } from '../controller/review.controller.js';

const router = Router();
router.route("/auth").post(RegisterUser);
router.route("/login").post(loginUser);
router.route("/")
    .get(getAllProducts)
    .post(authAdmin,addProduct);
    
router.route("/category/:category").get(getProductsByCategory);


router.route("/:id")
    .get(getProduct)
    .patch(authAdmin,editProduct)
    .delete(authAdmin,deleteProduct);


export default router;