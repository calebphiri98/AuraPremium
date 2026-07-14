import * as db from '../config/db.js';

/**
 * Creates a product with atomicity. Uses explicit PostgreSQL 
 * transactions to ensure consistency between products and images.
 */
export const createProduct = async (req, res, next) => {
  const client = await db.default.connect();
  try {
    await client.query('BEGIN');
    
    const { category_id, name, description, price, stock, featured, specifications } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const productQuery = `
      INSERT INTO products (category_id, name, slug, description, price, stock, featured, specifications)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const productResult = await client.query(productQuery, [
      category_id || null, name, slug, description, price, stock || 0, featured || false, specifications || '{}'
    ]);
    const product = productResult.rows[0];

    // Process file buffers if injected via multipart channel
    if (req.files && req.files.length > 0) {
      const imageQuery = `
        INSERT INTO product_images (product_id, image_url, display_order, is_primary)
        VALUES ($1, $2, $3, $4);
      `;
      for (let i = 0; i < req.files.length; i++) {
        // Base64 encoding for local fallback simulation; production should pipe to bucket URL
        const dataUri = `data:${req.files[i].mimetype};base64,${req.files[i].buffer.toString('base64')}`;
        await client.query(imageQuery, [product.id, dataUri, i, i === 0]);
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

/**
 * High-performance advanced query block filtering engine with parameterized SQL conditions.
 */
export const getProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;
    
    let queryText = `
      SELECT p.*, c.name as category_name,
      (SELECT image_url FROM product_images WHERE product_id = p.id ORDER BY is_primary DESC, display_order ASC LIMIT 1) as primary_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (category) {
      queryText += ` AND c.slug = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (search) {
      queryText += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (minPrice) {
      queryText += ` AND p.price >= $${paramIndex}`;
      params.push(minPrice);
      paramIndex++;
    }

    if (maxPrice) {
      queryText += ` AND p.price <= $${paramIndex}`;
      params.push(maxPrice);
      paramIndex++;
    }

    // Dynamic sort matrix matching business criteria securely
    const sortMatrix = {
      newest: 'ORDER BY p.created_at DESC',
      oldest: 'ORDER BY p.created_at ASC',
      'price-low': 'ORDER BY p.price ASC',
      'price-high': 'ORDER BY p.price DESC'
    };
    queryText += ` ${sortMatrix[sort] || 'ORDER BY p.created_at DESC'}`;

    queryText += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(parseInt(limit), offset);

    const result = await db.query(queryText, params);
    res.status(200).json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    next(error);
  }
};

/**
 * Gets a product by slug, returning its image array sub-tables.
 */
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const productResult = await db.query('SELECT * FROM products WHERE slug = $1', [slug]);
    
    if (productResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Resource distribution index error: Product not located.' });
    }

    const product = productResult.rows[0];
    const imagesResult = await db.query('SELECT * FROM product_images WHERE product_id = $1 ORDER BY display_order ASC', [product.id]);

    res.status(200).json({
      success: true,
      data: { ...product, images: imagesResult.rows }
    });
  } catch (error) {
    next(error);
  }
};