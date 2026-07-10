// Import the mysql2 package
const mysql = require("mysql2");

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed:", err.message);
    return;
  }

  console.log("Connected to MySQL Database");
});

// Export the database connection
module.exports = db;