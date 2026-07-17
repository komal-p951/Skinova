import { Router } from "express";
import { isLogginUser } from "../middleware/islogginUser.js";
import { createNewOrder } from "../controller/order.controller.js";
const router = Router();

router.route("/neworder").post(isLogginUser, createNewOrder);
export default router;