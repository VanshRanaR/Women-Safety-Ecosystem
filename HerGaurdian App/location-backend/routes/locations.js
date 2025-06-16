const express = require("express");
const router = express.Router();
const Location = require("../models/location");

// POST /api/locations
router.post("/", async (req, res) => {
  const { area, lat, lng } = req.body;

  if (!area || !lat || !lng) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Try to find an existing location
    const existing = await Location.findOne({ lat, lng });

    if (existing) {
      // If found, increase the count
      existing.count += 1;
      await existing.save();
      return res.json({ message: "Count updated", location: existing });
    }

    // If not found, create a new location
    const newLocation = new Location({ area, lat, lng });
    await newLocation.save();
    res.status(201).json({ message: "Location saved", location: newLocation });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// GET /api/locations - fetch all locations
router.get("/", async (req, res) => {
    try {
      const locations = await Location.find({}, { _id: 0, lat: 1, lng: 1, count: 1 });
      res.json(locations);
    } catch (err) {
      console.error("Error fetching locations:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
module.exports = router;
