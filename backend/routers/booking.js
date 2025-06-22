import express from "express"
import Booking from "../models/booking.js";

const bookingRouter = express.Router();


// create booking 
bookingRouter.post("/create", async(req, res) => {
  try {
    const {customerId, hostId, listingId, startDate, endDate, totalPrice} = req.body;

    if (
      !customerId ||
      !hostId ||
      !listingId ||
      !startDate ||
      !endDate ||
      !totalPrice
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice
    });
    await newBooking.save();
    res.status(200).json({success: true, booking: newBooking, message: "Booking created successfuly"});
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}) 

export default bookingRouter;