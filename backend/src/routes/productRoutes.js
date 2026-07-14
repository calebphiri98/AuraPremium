import express from 'express';
import db from '../config/db.js';
import { upload } from '../middleware/upload.js';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const IMAGE_QUERY = `
  SELECT p.*, c.name AS category_name,
    COALESCE(
      json_agg(
        json_build_object('id', pi.id, 'image_url', pi.image_url, 'is_primary', pi.is_primary, 'display_order', pi.display_order)
        ORDER BY pi.display_order
      ) FILTER (WHERE pi.id IS NOT NULL), '[]'
    ) AS images
  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
  LEFT JOIN product_images pi ON pi.product_id = p.id
`;

// UPLOAD ROUTE
router.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No media file detected.' });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, { folder: 'shoestop-products' });
    res.status(200).json({ image_url: result.secure_url });
  } catch (err) {
    next(err);
  }
});

// GET all products
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(`${IMAGE_QUERY} GROUP BY p.id, c.name ORDER BY p.created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET product by SLUG (Place this BEFORE the /:id route)
router.get('/:slug', async (req, res, next) => {
  try {
    // Check if the parameter is numeric (an ID) or a string (a slug)
    const isNumeric = /^\d+$/.test(req.params.slug);
    const query = isNumeric ? `${IMAGE_QUERY} WHERE p.id = $1 GROUP BY p.id, c.name` : `${IMAGE_QUERY} WHERE p.slug = $1 GROUP BY p.id, c.name`;
    
    const result = await db.query(query, [req.params.slug]);
    
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });
    
    // Return with success flag to match your frontend expectation
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// POST new product
router.post('/', async (req, res, next) => {
  const { name, slug, description, price, stock, category_id, featured = false, specifications = {}, images = [] } = req.body;
  try {
    const productResult = await db.query(
      `INSERT INTO products (name, slug, description, price, stock, category_id, featured, specifications)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [name, slug, description, price, stock, category_id || null, featured, specifications]
    );
    const product = productResult.rows[0];
    if (Array.isArray(images) && images.length) {
      for (let i = 0; i < images.length; i++) {
        await db.query(`INSERT INTO product_images (product_id, image_url, display_order, is_primary) VALUES ($1, $2, $3, $4)`, [product.id, images[i].image_url, i, i === 0]);
      }
    }
    const full = await db.query(`${IMAGE_QUERY} WHERE p.id = $1 GROUP BY p.id, c.name`, [product.id]);
    res.status(201).json(full.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT update product
router.put('/:id', async (req, res, next) => {
  const { name, slug, description, price, stock, category_id, featured, specifications, images } = req.body;
  try {
    const result = await db.query(
      `UPDATE products SET name = COALESCE($1, name), slug = COALESCE($2, slug), description = COALESCE($3, description), price = COALESCE($4, price), stock = COALESCE($5, stock), category_id = $6, featured = COALESCE($7, featured), specifications = COALESCE($8, specifications), updated_at = CURRENT_TIMESTAMP WHERE id = $9 RETURNING *`,
      [name, slug, description, price, stock, category_id || null, featured, specifications, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    if (Array.isArray(images)) {
      await db.query('DELETE FROM product_images WHERE product_id = $1', [req.params.id]);
      for (let i = 0; i < images.length; i++) {
        await db.query(`INSERT INTO product_images (product_id, image_url, display_order, is_primary) VALUES ($1, $2, $3, $4)`, [req.params.id, images[i].image_url, i, i === 0]);
      }
    }
    const full = await db.query(`${IMAGE_QUERY} WHERE p.id = $1 GROUP BY p.id, c.name`, [req.params.id]);
    res.json(full.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE product
router.delete('/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
// import express from 'express';
// import db from '../config/db.js';
// import { upload } from '../middleware/upload.js';
// import { v2 as cloudinary } from 'cloudinary';


// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const router = express.Router();

// const IMAGE_QUERY = `
//   SELECT p.*, c.name AS category_name,
//     COALESCE(
//       json_agg(
//         json_build_object('id', pi.id, 'image_url', pi.image_url, 'is_primary', pi.is_primary, 'display_order', pi.display_order)
//         ORDER BY pi.display_order
//       ) FILTER (WHERE pi.id IS NOT NULL), '[]'
//     ) AS images
//   FROM products p
//   LEFT JOIN categories c ON c.id = p.category_id
//   LEFT JOIN product_images pi ON pi.product_id = p.id
// `;

// // UPLOAD ROUTE
// // This will be accessible at: POST /api/products/upload
// router.post('/upload', upload.single('image'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No media file detected.' });
//     }

//     // Convert memory buffer to base64
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(dataURI, {
//       folder: 'shoestop-products',
//     });

//     res.status(200).json({ image_url: result.secure_url });
//   } catch (err) {
//     next(err);
//   }
// });

// // GET all products
// router.get('/', async (req, res, next) => {
//   try {
//     const result = await db.query(`${IMAGE_QUERY} GROUP BY p.id, c.name ORDER BY p.created_at DESC`);
//     res.json(result.rows);
//   } catch (err) {
//     next(err);
//   }
// });

// // GET single product
// router.get('/:id', async (req, res, next) => {
//   try {
//     const result = await db.query(`${IMAGE_QUERY} WHERE p.id = $1 GROUP BY p.id, c.name`, [req.params.id]);
//     if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
//     res.json(result.rows[0]);
//   } catch (err) {
//     next(err);
//   }
// });

// // POST new product
// router.post('/', async (req, res, next) => {
//   const {
//     name, slug, description, price, stock, category_id,
//     featured = false, specifications = {}, images = [],
//   } = req.body;

//   try {
//     const productResult = await db.query(
//       `INSERT INTO products (name, slug, description, price, stock, category_id, featured, specifications)
//        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
//       [name, slug, description, price, stock, category_id || null, featured, specifications]
//     );
//     const product = productResult.rows[0];

//     if (Array.isArray(images) && images.length) {
//       for (let i = 0; i < images.length; i++) {
//         await db.query(
//           `INSERT INTO product_images (product_id, image_url, display_order, is_primary)
//            VALUES ($1, $2, $3, $4)`,
//           [product.id, images[i].image_url, i, i === 0]
//         );
//       }
//     }

//     const full = await db.query(`${IMAGE_QUERY} WHERE p.id = $1 GROUP BY p.id, c.name`, [product.id]);
//     res.status(201).json(full.rows[0]);
//   } catch (err) {
//     next(err);
//   }
// });

// // PUT update product
// router.put('/:id', async (req, res, next) => {
//   const {
//     name, slug, description, price, stock, category_id,
//     featured, specifications, images,
//   } = req.body;

//   try {
//     const result = await db.query(
//       `UPDATE products
//        SET name = COALESCE($1, name),
//            slug = COALESCE($2, slug),
//            description = COALESCE($3, description),
//            price = COALESCE($4, price),
//            stock = COALESCE($5, stock),
//            category_id = $6,
//            featured = COALESCE($7, featured),
//            specifications = COALESCE($8, specifications),
//            updated_at = CURRENT_TIMESTAMP
//        WHERE id = $9
//        RETURNING *`,
//       [name, slug, description, price, stock, category_id || null, featured, specifications, req.params.id]
//     );

//     if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });

//     if (Array.isArray(images)) {
//       await db.query('DELETE FROM product_images WHERE product_id = $1', [req.params.id]);
//       for (let i = 0; i < images.length; i++) {
//         await db.query(
//           `INSERT INTO product_images (product_id, image_url, display_order, is_primary)
//            VALUES ($1, $2, $3, $4)`,
//           [req.params.id, images[i].image_url, i, i === 0]
//         );
//       }
//     }

//     const full = await db.query(`${IMAGE_QUERY} WHERE p.id = $1 GROUP BY p.id, c.name`, [req.params.id]);
//     res.json(full.rows[0]);
//   } catch (err) {
//     next(err);
//   }
// });

// // DELETE product
// router.delete('/:id', async (req, res, next) => {
//   try {
//     await db.query('DELETE FROM products WHERE id = $1', [req.params.id]);
//     res.json({ message: 'Product deleted' });
//   } catch (err) {
//     next(err);
//   }
// });

// export default router;