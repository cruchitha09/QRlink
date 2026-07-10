const express = require("express");

const {
    createShortUrl,
    getMyLinks,
    deleteLink,
    generateQRCode,
    redirectUrl
} = require("../controllers/urlController");

const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Create Short URL
router.post("/create", verifyToken, createShortUrl);

// Get My Links
router.get("/my-links", verifyToken, getMyLinks);

// Delete Link
router.delete("/delete/:id", verifyToken, deleteLink);

// Generate QR Code
router.get("/qr/:shortCode", verifyToken, generateQRCode);

// Redirect
router.get("/:shortCode", redirectUrl);

module.exports = router;