import { Router } from'express'
import { addProduct, deleteProduct, editProduct, getAllProducts, getAllUsers, getProduct, getProductsByCategory, loginUser, RegisterUser } from '../controller/user.controller.js';
import { authAdmin } from '../middleware/isAuthor.js';
import { addReview } from '../controller/review.controller.js';

const router = Router();
router.route("/").get(getAllProducts);

router.route("/auth").post(RegisterUser);
router.route("/login").post(loginUser);


router.route("/getallusers").get(authAdmin,getAllUsers);
router.route("/addproduct").post(authAdmin,addProduct);
router.route("/category/:category").get(getProductsByCategory);
router.route("/:id").get(getProduct);
router.route("/:id")
    .patch(authAdmin,editProduct)
    .delete(authAdmin,deleteProduct); 

export default router;