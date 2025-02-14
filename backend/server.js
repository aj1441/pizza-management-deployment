// Import required modules
const express = require("express");
const path = require("path");
require("dotenv").config(); // Load environment variables

// Import the main Express app
const app = require('./app');

// Define the port for the server to listen on
const PORT = process.env.PORT || 5000;

// Import the PostgreSQL client for database interaction
const { Pool } = require("pg");

// Configure database connection using DATABASE_URL (for Heroku) or local variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Database connection successful:", res.rows);
  }
});

// Serve frontend static files (React Vite build)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route to serve React's index.html for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start the Express server and log the listening port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Import the PostgreSQL client for database interaction
const { Client } = require('pg');

// Load environment variables from a .env file
require('dotenv').config();

// Create a PostgreSQL client instance using environment variables
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Import the database pool for executing queries
const pool = require('./database/db');

// Test the database connection by executing a simple query
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    // Log an error message if the connection fails
    console.error('Error connecting to the database:', err.message);
  } else {
    // Log a success message with the current timestamp
    console.log('Database connection successful:', res.rows);
  }
});
