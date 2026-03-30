import "dotenv/config";
import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.DATABASE_URL
    ? {}
    : {
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

// Helpers
function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

async function hashPassword(plain) {
  const saltRounds = 10;
  return bcrypt.hash(plain, saltRounds);
}

async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: payload.sub,
      email: payload.email,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Auth routes
app.post("/api/auth/signup", async (req, res) => {
  const { email, password, accountType } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and password are required" });
  }

  try {
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "An account with this email already exists" });
    }

    const passwordHash = await hashPassword(password);
    const type = accountType || "recovering";

    const insertResult = await pool.query(
      `INSERT INTO users (email, password_hash, account_type)
       VALUES ($1, $2, $3)
       RETURNING id, email`,
      [email, passwordHash, type]
    );

    const user = insertResult.rows[0];
    const token = createToken(user);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Failed to create account" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and password are required" });
  }

  try {
    const result = await pool.query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = createToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Failed to log in" });
  }
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

const REWIRE_MODULE_TITLE = "The Rewire Program";

// GET /api/me/progress/rewire — completed step numbers (1–5) for the Rewire curriculum
app.get("/api/me/progress/rewire", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id, 10);
  if (Number.isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user" });
  }

  try {
    const result = await pool.query(
      `SELECT cs.sort_order
       FROM user_progress up
       JOIN curriculum_steps cs ON cs.id = up.step_id
       JOIN curriculum_modules cm ON cm.id = cs.module_id
       WHERE up.user_id = $1 AND cm.title = $2
       ORDER BY cs.sort_order`,
      [userId, REWIRE_MODULE_TITLE]
    );
    res.json({
      completedStepNumbers: result.rows.map((row) => row.sort_order),
    });
  } catch (err) {
    console.error("Error fetching rewire progress:", err);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

// POST /api/me/progress/rewire — body: { stepNumber: 1–5, completed: boolean }
app.post("/api/me/progress/rewire", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id, 10);
  const { stepNumber, completed } = req.body;

  if (Number.isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user" });
  }

  if (
    typeof stepNumber !== "number" ||
    !Number.isInteger(stepNumber) ||
    stepNumber < 1 ||
    stepNumber > 5
  ) {
    return res.status(400).json({ error: "stepNumber must be an integer from 1 to 5" });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed must be a boolean" });
  }

  try {
    const stepResult = await pool.query(
      `SELECT cs.id FROM curriculum_steps cs
       JOIN curriculum_modules cm ON cm.id = cs.module_id
       WHERE cm.title = $1 AND cs.sort_order = $2`,
      [REWIRE_MODULE_TITLE, stepNumber]
    );

    if (stepResult.rows.length === 0) {
      return res.status(404).json({
        error:
          "Rewire curriculum is not seeded. Run db/seed.sql (The Rewire Program module).",
      });
    }

    const stepId = stepResult.rows[0].id;

    if (completed) {
      await pool.query(
        `INSERT INTO user_progress (user_id, step_id) VALUES ($1, $2)
         ON CONFLICT (user_id, step_id) DO NOTHING`,
        [userId, stepId]
      );
    } else {
      await pool.query(
        `DELETE FROM user_progress WHERE user_id = $1 AND step_id = $2`,
        [userId, stepId]
      );
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Error updating rewire progress:", err);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// POST /api/auth/change-password - Change user password
app.post("/api/auth/change-password", requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current and new password are required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters" });
  }

  try {
    const result = await pool.query(
      "SELECT id, password_hash FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];
    const isValid = await verifyPassword(currentPassword, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const newHash = await hashPassword(newPassword);

    await pool.query(
      "UPDATE users SET password_hash = $1 WHERE id = $2",
      [newHash, req.user.id]
    );

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ error: "Failed to change password" });
  }
});

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
