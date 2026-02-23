const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Blog API Running...");
});

module.exports = app;