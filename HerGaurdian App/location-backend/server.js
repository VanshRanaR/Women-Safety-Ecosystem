require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const locationRoutes = require("./routes/locations");
app.use("/api/locations", locationRoutes);

const port = process.env.PORT || 5000;
console.log("MONGO URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
