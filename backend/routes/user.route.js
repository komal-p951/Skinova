import { Router } from'express'
import { addProduct, deleteProduct, editProduct, getAllProducts, getAllUsers, getProduct, getProductsByCategory, getProfile, loginUser, RegisterUser, updatedProfileData } from '../controller/user.controller.js';
import { authAdmin } from '../middleware/isAuthor.js';
import { addReview } from '../controller/review.controller.js';
import { isLogginUser } from '../middleware/islogginUser.js';
// import storage from '../middleware/upload.js';
import multer from 'multer';
import { storage } from '../cloudConfig.js';
const upload = multer({storage});


const router = Router();
router.route("/").get(getAllProducts);

router.route("/auth").post(RegisterUser);
router.route("/login").post(loginUser);


router.route("/getallusers").get(authAdmin,getAllUsers);
router.route("/addproduct").post(authAdmin,upload.array("images"),addProduct);
// router.route("/upload/productImage").post(upload.array("images"),uploadProductImage);
router.route("/category/:category").get(getProductsByCategory);
router.route("/user/:id").get(isLogginUser,getProfile);
router.route("/user/:id/update").patch(isLogginUser,updatedProfileData);
router.route("/:id").get(getProduct);
router.route("/:id")
    .patch(authAdmin,editProduct)
    .delete(authAdmin,deleteProduct); 

export default router;


// const upload = multer({ dest: 'uploads/' })

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // make sure 'uploads' folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });