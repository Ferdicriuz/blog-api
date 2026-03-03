const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();

app.use(express.json());
app.use(helmet());
app.use(xss());

// Rate limiter (100 requests per 15 mins)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
module.exports = app;