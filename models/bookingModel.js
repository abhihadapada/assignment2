import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  event: {
    type: String,
    required: [true, "Event name is required"],
  },
  ticketType: {
    type: String,
    enum: ["Regular", "VIP", "Student", "Other"],
    default: "Regular",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
