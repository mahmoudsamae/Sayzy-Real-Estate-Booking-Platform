import express from "express"
import Booking from "../models/booking.js";
import User from "../models/User.js";
import Listing from "../models/listing.js";

const userRouter = express.Router();


// get trips 
userRouter.get("/:userId/trips", async (req, res) => {
  try {
    const {userId} = req.params;
    const trips = await Booking.find({customerId: userId}).populate("customerId hostId listingId")
    res.status(200).json({success: true, tripList: trips})
  } catch (error) {
    res.status(404).json({success: false, message: error.message})
  }
})


// wish trip 
userRouter.patch("/:userId/:listingId", async (req, res) => {
  try {
    const {userId, listingId} = req.params;
    console.log(userId)
    const user =  await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const listing = await Listing.findById(listingId).populate("creator");

    const favoriteListing = user.wishList.find(item => item._id.toString() === listingId);

    if(favoriteListing){
      user.wishList = user.wishList.filter(item => item._id.toString() !== listingId);
      await user.save();
      res.status(200).json({success: true, message: "Listing removed from WishList", wishList: user.wishList})
    }else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({success: true, message: "Listing added to WhishList", wishList: user.wishList})
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
})


// get User Listing
userRouter.get("/:userId/listing", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    const listing = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(200).json({ success: true, listing });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});


// get Reservation Listing
userRouter.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json({ success: true, reservations });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

export default userRouter