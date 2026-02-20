import "dotenv/config";
import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.DATABASE_URL ? {} : {
    host: process.env.PGHOST || "localhost",
    port: process.env.PGPORT || 5432,
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    database: process.env.PGDATABASE || "overcome_wellness",
  }),
});

// Middleware
app.use(cors());
app.use(express.json());

// GET /api/mentors - Return all mentors
app.get("/api/mentors", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, role, specialty, bio, rating, is_professional, created_at FROM mentors ORDER BY is_professional DESC, name"
    );
    const mentors = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      specialty: row.specialty,
      bio: row.bio,
      rating: parseFloat(row.rating),
      professional: row.is_professional,
    }));
    res.json(mentors);
  } catch (err) {
    console.error("Error fetching mentors:", err);
    res.status(500).json({ error: "Failed to fetch mentors" });
  }
});

// POST /api/mentors - Add a new mentor
app.post("/api/mentors", async (req, res) => {
  const { name, role, specialty, bio, rating, is_professional } = req.body;

  if (!name || !role || !specialty || !bio) {
    return res.status(400).json({
      error: "Missing required fields: name, role, specialty, and bio are required",
    });
  }

  const ratingVal = rating != null ? parseFloat(rating) : 4.5;
  const professional = is_professional !== false;

  try {
    const result = await pool.query(
      `INSERT INTO mentors (name, role, specialty, bio, rating, is_professional)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, role, specialty, bio, rating, is_professional, created_at`,
      [name, role, specialty, bio, ratingVal, professional]
    );
    const row = result.rows[0];
    const mentor = {
      id: row.id,
      name: row.name,
      role: row.role,
      specialty: row.specialty,
      bio: row.bio,
      rating: parseFloat(row.rating),
      professional: row.is_professional,
    };
    res.status(201).json(mentor);
  } catch (err) {
    console.error("Error adding mentor:", err);
    res.status(500).json({ error: "Failed to add mentor" });
  }
});

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
