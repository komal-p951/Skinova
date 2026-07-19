import { Router } from "express";
import { isLogginUser } from "../middleware/islogginUser.js";
import { createNewOrder, getMyOrders } from "../controller/order.controller.js";
const router = Router();

router.route("/neworder").post(isLogginUser, createNewOrder);
router.route("/myorders").get(isLogginUser,getMyOrders);
export default router;