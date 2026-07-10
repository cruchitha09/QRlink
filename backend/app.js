// Import Express framework
const express = require("express");

// Import authentication routes
const authRoutes = require("./routes/authRoutes");

// Import URL routes
const urlRoutes = require("./routes/urlRoutes");

// Create an Express application
const app = express();

// Enable JSON parsing middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("QRLink Backend Running");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// URL routes
app.use("/api/url", urlRoutes);

// Redirect route
app.use("/", urlRoutes);

// Export the app
module.exports = app;