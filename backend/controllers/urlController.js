const QRCode = require("qrcode");
const db = require("../config/db");
const { generateShortCode } = require("../utils/generateCode");

// Create Short URL
exports.createShortUrl = (req, res) => {

    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({
            message: "Original URL is required"
        });
    }

    const shortCode = generateShortCode();

    const query =
        "INSERT INTO links (user_id, original_url, short_code) VALUES (?, ?, ?)";

    db.query(query, [req.user.id, originalUrl, shortCode], (err) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        return res.status(201).json({
            originalUrl,
            shortCode,
            shortUrl: `http://localhost:5000/${shortCode}`
        });

    });

};


// Get all links of logged-in user
exports.getMyLinks = (req, res) => {

    const query =
        "SELECT * FROM links WHERE user_id = ? ORDER BY created_at DESC";

    db.query(query, [req.user.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        return res.status(200).json(result);

    });

};


// Delete Link
exports.deleteLink = (req, res) => {

    const { id } = req.params;

    const query =
        "DELETE FROM links WHERE id = ? AND user_id = ?";

    db.query(query, [id, req.user.id], (err) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        return res.status(200).json({
            message: "Link Deleted Successfully"
        });

    });

};

// Generate QR Code
exports.generateQRCode = async (req, res) => {

    const { shortCode } = req.params;

    const shortUrl = `http://localhost:5000/${shortCode}`;

    try {

        const qrCode = await QRCode.toDataURL(shortUrl);

        return res.status(200).json({
            short_url: shortUrl,
            qr_code: qrCode
        });

    } catch (err) {

        return res.status(500).json({
            message: "QR Code Generation Failed"
        });

    }

};


// Redirect
exports.redirectUrl = (req, res) => {

    const { shortCode } = req.params;

    const query =
        "SELECT original_url FROM links WHERE short_code = ?";

    db.query(query, [shortCode], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Short URL Not Found"
            });
        }

        res.redirect(result[0].original_url);

    });

};