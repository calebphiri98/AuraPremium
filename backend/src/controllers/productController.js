import { query } from '../config/db.js';

// @desc    Get all products with primary images and category details
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const sqlQuery = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.specifications,
        p.price,
        p.stock,
        p.featured,
        p.created_at,
        c.name AS category_name,
        c.slug AS category_slug,
        (
          SELECT COALESCE(json_agg(images_sub), '[]'::json)
          FROM (
            SELECT id, image_url, is_primary, display_order
            FROM product_images
            WHERE product_id = p.id
            ORDER BY display_order ASC
          ) images_sub
        ) AS images
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC;
    `;

    const result = await query(sqlQuery);
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error("DEBUG GET PRODUCTS ERROR:", error);
    next(error);
  }
};

// @desc    Get a single product by Slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const sqlQuery = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.specifications,
        p.price,
        p.stock,
        p.featured,
        p.created_at,
        p.updated_at,
        c.name AS category_name,
        c.slug AS category_slug,
        (
          SELECT COALESCE(json_agg(images_sub), '[]'::json)
          FROM (
            SELECT id, image_url, is_primary, display_order
            FROM product_images
            WHERE product_id = p.id
            ORDER BY display_order ASC
          ) images_sub
        ) AS images
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = $1;
    `;

    const result = await query(sqlQuery, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error("DEBUG GET PRODUCT BY SLUG ERROR:", error);
    next(error);
  }
};

// // backend/src/controllers/productController.js
// import { query } from '../config/db.js';

// // @desc    Get all products with primary images and category details
// // @route   GET /api/products
// // @access  Public
// export const getProducts = async (req, res, next) => {
//   try {
//     const sqlQuery = `
//       SELECT 
//         p.id,
//         p.name,
//         p.slug,
//         p.description,
//         p.specifications,
//         p.price,
//         p.stock,
//         p.featured,
//         p.created_at,
//         c.name AS category_name,
//         c.slug AS category_slug,
//         -- Aggregates all related images into a structured JSON array
//         COALESCE(
//           json_agg(
//             json_build_object(
//               'id', pi.id,
//               'image_url', pi.image_url,
//               'is_primary', pi.is_primary,
//               'display_order', pi.display_order
//             ) ORDER BY pi.display_order ASC
//           ) FILTER (WHERE pi.id IS NOT NULL), 
//           '[]'::json
//         ) AS images
//       FROM products p
//       LEFT JOIN categories c ON p.category_id = c.id
//       LEFT JOIN product_images pi ON p.id = pi.product_id
//       GROUP BY p.id, c.id
//       ORDER BY p.created_at DESC;
//     `;

//     const result = await query(sqlQuery);
    
//     res.status(200).json({
//       success: true,
//       count: result.rows.length,
//       data: result.rows
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get a single product by Slug (better for SEO/URLs than raw IDs)
// // @route   GET /api/products/:slug
// // @access  Public
// export const getProductBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const sqlQuery = `
//       SELECT 
//         p.id,
//         p.name,
//         p.slug,
//         p.description,
//         p.specifications,
//         p.price,
//         p.stock,
//         p.featured,
//         p.created_at,
//         p.updated_at,
//         c.name AS category_name,
//         c.slug AS category_slug,
//         COALESCE(
//           json_agg(
//             json_build_object(
//               'id', pi.id,
//               'image_url', pi.image_url,
//               'is_primary', pi.is_primary,
//               'display_order', pi.display_order
//             ) ORDER BY pi.display_order ASC
//           ) FILTER (WHERE pi.id IS NOT NULL), 
//           '[]'::json
//         ) AS images
//       FROM products p
//       LEFT JOIN categories c ON p.category_id = c.id
//       LEFT JOIN product_images pi ON p.id = pi.product_id
//       WHERE p.slug = $1
//       GROUP BY p.id, c.id;
//     `;

//     const result = await query(sqlQuery, [slug]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         success: false,
//         error: 'Product not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: result.rows[0]
//     });
//   } catch (error) {
//     next(error);
//   }
// };