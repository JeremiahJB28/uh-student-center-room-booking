const express = require("express");
const router = express.Router();
const { readData } = require("../utils/jsonStore");

// GET /api/rooms  (already implemented - study this pattern)
router.get("/", (req, res) => {
  const rooms = readData("rooms.json");
  res.json(rooms);
});

// GET /api/rooms/:id
router.get("/:id", (req, res) => {
  const rooms = readData("rooms.json");
  const room = rooms.find((r) => r.id === req.params.id);

  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ error: "Room not found" });
  }
});

module.exports = router;