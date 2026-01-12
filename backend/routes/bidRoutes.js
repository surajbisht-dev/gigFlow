import express from "express";
import {
  createBid,
  getBidsByGig,
  getMyBids,
  hireBid,
} from "../controllers/bidController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBid);
router.get("/my", protect, getMyBids);
router.get("/:gigId", protect, getBidsByGig);
router.patch("/:bidId/hire", protect, hireBid);

export default router;
