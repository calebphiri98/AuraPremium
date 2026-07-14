import multer from 'multer';
import path from 'path';

// Memory Storage engine config for clean stream processing (Vercel/Render ephemeral storage friendly)
// Note: For full enterprise permanence, these buffers can be piped directly to AWS S3 / Cloudinary.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Mime-Type Violations: Only JPEG, JPG, PNG, and WEBP assets are authorized for ingestion.'));
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Strict 5MB structural barrier
  fileFilter
});