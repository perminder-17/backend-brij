const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Connect to the database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected"))
.catch((error) => console.error("Database connection error:", error));

// Middlewares
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});