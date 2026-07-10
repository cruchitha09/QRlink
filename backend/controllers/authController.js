const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    // Check for empty fields
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check if email already exists
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";

    db.query(checkEmailQuery, [email], async (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        try {

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            const insertQuery =
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

            db.query(
                insertQuery,
                [name, email, hashedPassword],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Database Error"
                        });
                    }

                    return res.status(201).json({
                        message: "User Registered Successfully"
                    });

                }
            );

        } catch (error) {

            return res.status(500).json({
                message: "Server Error"
            });

        }

    });

};

// Login User
exports.loginUser = (req, res) => {

    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            message: "Login Successful",
            token
        });

    });

};