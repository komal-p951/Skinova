import { Router } from "express";
import { isLogginUser } from "../middleware/islogginUser.js";
import { createNewOrder, getAllOrders, getMyOrders, getOrder } from "../controller/order.controller.js";
import { authAdmin } from "../middleware/isAuthor.js";
const router = Router();

router.route("/neworder").post(isLogginUser, createNewOrder);
router.route("/myorders").get(isLogginUser,getMyOrders);
router.route("/getallorders").get(authAdmin, getAllOrders);
router.route("/getorder/:id").get(isLogginUser,getOrder);
export default router;