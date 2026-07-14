import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all categories, with a product count for each
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT c.*, COUNT(p.id)::int AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name ASC
    `);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// POST new category (Admin Only)
router.post('/', async (req, res, next) => {
  const { name, slug } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *',
      [name, slug]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update category (Admin Only)
router.put('/:id', async (req, res, next) => {
  const { name, slug } = req.body;
  try {
    const result = await db.query(
      'UPDATE categories SET name = COALESCE($1, name), slug = COALESCE($2, slug) WHERE id = $3 RETURNING *',
      [name, slug, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE category (Admin Only)
router.delete('/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;