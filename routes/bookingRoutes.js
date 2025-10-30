import express from "express";
import {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  searchBookingByEmail,
  filterBookingByEvent,
} from "../controllers/bookingController.js";

const router = express.Router();

// CRUD Routes
router.get("/", getAllBookings);
router.post("/", createBooking);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

// Query Routes
router.get("/search/email", searchBookingByEmail);
router.get("/filter/event", filterBookingByEvent);

export default router;
