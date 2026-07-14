// backend/src/controllers/orderController.js
import pool from '../config/db.js'; // Converted to ES import with file extension

export const createOrder = async (req, res) => {
  const { customer_name, phone, delivery_location, notes, items, total_price } = req.body;

  if (!customer_name || !phone || !delivery_location || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing required order fields.' });
  }

  // Use a transaction to ensure both the order and its items are saved safely
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Insert into the main orders table
    const orderQuery = `
      INSERT INTO orders (customer_name, phone, delivery_location, notes, total_price, status)
      VALUES ($1, $2, $3, $4, $5, 'Pending')
      RETURNING id, created_at;
    `;
    const orderValues = [customer_name, phone, delivery_location, notes, total_price];
    const orderResult = await client.query(orderQuery, orderValues);
    const orderId = orderResult.rows[0].id;

    // 2. Insert all items associated with this order
    const itemQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4);
    `;

    for (const item of items) {
      await client.query(itemQuery, [orderId, item.id, item.quantity, item.price]);
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: {
        order_id: orderId,
        created_at: orderResult.rows[0].created_at
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database transaction error:', error);
    res.status(500).json({ success: false, message: 'Internal server database error.' });
  } finally {
    client.release();
  }
};