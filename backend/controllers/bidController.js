import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import mongoose from "mongoose";
import { io, onlineUsers } from "../socket/socket.js";

// Create bid
export const createBid = async (req, res) => {
  try {
    const bid = await Bid.create({
      gigId: req.body.gigId,
      freelancerId: req.user.id,
      message: req.body.message,
      price: req.body.price,
    });

    res.status(201).json(bid);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "You have already placed a bid on this gig",
      });
    }

    res.status(500).json({ message: "Failed to place bid" });
  }
};

export const getBidsByGig = async (req, res) => {
  const gig = await Gig.findById(req.params.gigId);

  if (!gig || gig.ownerId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const bids = await Bid.find({ gigId: gig._id }).populate(
    "freelancerId",
    "name email"
  );

  res.json(bids);
};

//freelancer bids
export const getMyBids = async (req, res) => {
  const bids = await Bid.find({ freelancerId: req.user.id }).populate(
    "gigId",
    "title status"
  );

  res.json(bids);
};

export const hireBid = async (req, res) => {
  const bid = await Bid.findById(req.params.bidId);
  if (!bid) return res.status(404).json({ message: "Bid not found" });

  const gig = await Gig.findById(bid.gigId);
  if (gig.status === "assigned") {
    return res.status(400).json({ message: "Gig already assigned" });
  }

  bid.status = "hired";
  await bid.save();

  await Bid.updateMany(
    { gigId: bid.gigId, _id: { $ne: bid._id } },
    { status: "rejected" }
  );

  gig.status = "assigned";
  await gig.save();

  res.json({ message: "Freelancer hired successfully" });
};
