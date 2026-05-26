import {Router} from'express';
import { addReview, deleteReview } from '../controller/review.controller.js';
import { isLogginUser } from '../middleware/islogginUser.js';

const router = Router();

router.route("/:id/reviews").post(isLogginUser,addReview);
router.route("/:id/reviews/:reviewId").delete(isLogginUser,deleteReview);

export default router;