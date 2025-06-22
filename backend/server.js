import express from "express";
import cors from "cors";
import "dotenv/config"
import mongoose from "mongoose";
import listinRouter from "./routers/listing.js";
import bookingRouter from "./routers/booking.js";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/user.js"
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.static("public"))

const PORT = process.env.PORT || 4000;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};
connectDB();

app.use("/auth", authRouter);
app.use("/listing", listinRouter);
app.use("/bookings", bookingRouter);
app.use("/users", userRouter)



app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
