import express from "express";
import { createGig, getGigs, getMyGigs } from "../controllers/gigController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getGigs);
router.get("/my", protect, getMyGigs);
router.post("/", protect, createGig);

export default router;
