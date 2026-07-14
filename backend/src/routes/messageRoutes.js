import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all messages/inquiries (Admin)
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// POST new message (Public - contact form on the storefront)
router.post('/', async (req, res, next) => {
  const { sender_name, email, company, message } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO messages (sender_name, email, company, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [sender_name, email, company || null, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PATCH mark message as processed/unprocessed (Admin)
router.patch('/:id/processed', async (req, res, next) => {
  const { processed = true } = req.body;
  try {
    const result = await db.query(
      'UPDATE messages SET processed = $1 WHERE id = $2 RETURNING *',
      [processed, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE message (Admin)
router.delete('/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM messages WHERE id = $1', [req.params.id]);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;