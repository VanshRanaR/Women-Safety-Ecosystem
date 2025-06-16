const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  area: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  count: { type: Number, default: 1 },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
