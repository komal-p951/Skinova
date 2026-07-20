import { Router } from "express";
import { isLogginUser } from "../middleware/islogginUser.js";
import { createNewOrder, getMyOrders, getOrder } from "../controller/order.controller.js";
const router = Router();

router.route("/neworder").post(isLogginUser, createNewOrder);
router.route("/myorders").get(isLogginUser,getMyOrders);
router.route("/getorder/:id").get(isLogginUser,getOrder);
export default router;