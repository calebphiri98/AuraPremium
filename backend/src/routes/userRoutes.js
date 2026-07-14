import express from 'express';
import db from '../config/db.js'; // Ensure this points to your configured Neon DB client
import bcrypt from 'bcryptjs';

const router = express.Router();

// Base user route for testing
router.get('/', (req, res) => {
  res.status(200).json({
    message: "User authentication and profile endpoint is online"
  });
});

// Registration route
router.post('/register', async (req, res) => {
  console.log("Registration request received for:", req.body.email);

  try {
    const { name, email, password, role } = req.body;

    // 1. Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 2. Insert into Neon PostgreSQL
    // Ensure column names match your DB table: id, name, email, password_hash, role
    const result = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, password_hash, role || 'user']
    );

    console.log("Database insert successful for ID:", result.rows[0].id);

    // 3. Send success response
    res.status(201).json({
      success: true,
      user: result.rows[0]
    });
    
  } catch (error) {
    console.error("Registration database error:", error);
    
    // Check for unique constraint violation (code 23505 is PostgreSQL unique violation)
    if (error.code === '23505') {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    res.status(500).json({ success: false, message: "Server error during registration" });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 3. Success
    res.status(200).json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Login database error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});
export default router;