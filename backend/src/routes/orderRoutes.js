import express from 'express';
import db from '../config/db.js'; // Need the DB instance for admin queries
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

// Existing route for creating an order (from the storefront)
router.post('/', createOrder);

// Admin route to fetch all orders - now includes order_items
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT o.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id, 'product_id', oi.product_id,
              'product_name', p.name, 'quantity', oi.quantity, 'price', oi.price
            )
          ) FILTER (WHERE oi.id IS NOT NULL), '[]'
        ) AS items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      LEFT JOIN products p ON p.id = oi.product_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// NEW: Admin route to fetch a single order with its items
router.get('/:id', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT o.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id, 'product_id', oi.product_id,
              'product_name', p.name, 'quantity', oi.quantity, 'price', oi.price
            )
          ) FILTER (WHERE oi.id IS NOT NULL), '[]'
        ) AS items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      LEFT JOIN products p ON p.id = oi.product_id
      WHERE o.id = $1
      GROUP BY o.id
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// Admin route to update order status
router.patch('/:id/status', async (req, res, next) => {
  const { status } = req.body;
  try {
    const result = await db.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ success: true, order: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// NEW: Admin route to delete an order (order_items cascade via FK)
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await db.query('DELETE FROM orders WHERE id = $1 RETURNING id', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
// import express from 'express';
// import db from '../config/db.js'; // Need the DB instance for admin queries
// import { createOrder } from '../controllers/orderController.js';

// const router = express.Router();

// // Existing route for creating an order (from the storefront)
// router.post('/', createOrder);

// // NEW: Admin route to fetch all orders
// router.get('/', async (req, res, next) => {
//   try {
//     const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     next(err); // Pass to errorHandler.js
//   }
// });

// // NEW: Admin route to update order status
// router.patch('/:id/status', async (req, res, next) => {
//   const { status } = req.body;
//   try {
//     const result = await db.query(
//       'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
//       [status, req.params.id]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Order not found" });
//     }
    
//     res.status(200).json({ success: true, order: result.rows[0] });
//   } catch (err) {
//     next(err);
//   }
// });

// export default router;