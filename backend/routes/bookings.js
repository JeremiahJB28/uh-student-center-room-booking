const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../utils/jsonStore");

// GET /api/bookings
router.get("/", (req, res) => {
  const bookings = readData("bookings.json");
  res.json(bookings);
});

// POST /api/bookings
router.post("/", (req, res) => {
  const { roomId, clubName, date, startTime, endTime, purpose } = req.body;

  // Validate that required fields are present
  if (!roomId || !clubName || !date || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const bookings = readData("bookings.json");

  const newBooking = {
    id: Date.now().toString(),
    roomId,
    clubName,
    date,
    startTime,
    endTime,
    purpose: purpose || "",
  };

  bookings.push(newBooking);
  writeData("bookings.json", bookings);

  res.status(201).json(newBooking);
});

// DELETE /api/bookings/:id
router.delete("/:id", (req, res) => {
  const bookings = readData("bookings.json");
  const filteredArray = bookings.filter((b) => b.id !== req.params.id);

  if (filteredArray.length === bookings.length) {
    return res.status(404).json({ error: "Booking not found" });
  }

  writeData("bookings.json", filteredArray);
  res.status(200).json({ message: "Booking canceled" });
});

module.exports = router;