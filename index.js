const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL pool (uses env vars — DO NOT hardcode)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

// Health check
app.get("/", (req, res) => {
  res.send("API is alive");
});

// 🔍 DB connection test
app.get("/db-test", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();

    res.json({ success: true, message: "DB connected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "DB connection failed"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
