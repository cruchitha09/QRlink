// Load environment variables from the .env file
require("dotenv").config();

// Import the Express application
const app = require("./app");

// Connect to the MySQL database
require("./config/db");

// Read the port number from the .env file
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});