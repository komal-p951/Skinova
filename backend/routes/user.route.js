import {Router} from'express'
import { addProduct, deleteProduct, getProduct, loginUser, RegisterUser } from '../controller/user.controller.js';
import { authAdmin } from '../middleware/isAuthor.js';

const router = Router();
router.route("/auth").post(RegisterUser);
router.route("/login").post(loginUser);
router.route("/:id").get(getProduct);

//author routes
router.route("/:id").delete(authAdmin,deleteProduct);
router.route("/addProduct").post(authAdmin,addProduct);

//user routes


export default router;