import Booking from "../models/bookingModel.js";

// ✅ GET all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching bookings" });
  }
};

// ✅ POST create a new booking
export const createBooking = async (req, res) => {
  try {
    const { name, email, event, ticketType } = req.body;

    if (!name || !email || !event) {
      return res.status(400).json({ success: false, message: "Name, email, and event are required" });
    }

    const booking = await Booking.create({ name, email, event, ticketType });
    res.status(201).json({ success: true, message: "Booking created successfully", data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating booking", error: error.message });
  }
};

// ✅ GET booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Invalid booking ID" });
  }
};

// ✅ PUT update booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking updated successfully", data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating booking" });
  }
};

// ✅ DELETE booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting booking" });
  }
};

// ✅ SEARCH booking by email
export const searchBookingByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email query is required" });
    }

    const bookings = await Booking.find({ email: { $regex: email, $options: "i" } });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error searching booking" });
  }
};

// ✅ FILTER booking by event
export const filterBookingByEvent = async (req, res) => {
  try {
    const { event } = req.query;
    if (!event) {
      return res.status(400).json({ success: false, message: "Event query is required" });
    }

    const bookings = await Booking.find({ event: { $regex: event, $options: "i" } });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error filtering booking" });
  }
};
