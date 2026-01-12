import Gig from "../models/Gig.js";

// Create gig
export const createGig = async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user.id,
  });
  res.status(201).json(gig);
};

//gigs search
export const getGigs = async (req, res) => {
  const search = req.query.search || "";

  const gigs = await Gig.find({
    status: "open",
    title: { $regex: search, $options: "i" },
  }).sort({ createdAt: -1 });

  res.json(gigs);
};

// My gigs (owner)
export const getMyGigs = async (req, res) => {
  const gigs = await Gig.find({ ownerId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(gigs);
};
