import express from 'express';

const router = express.Router();

// Base product route (for testing)
router.get('/', (req, res) => {
  res.status(200).json({
    message: "Products endpoint is online"
  });
});

export default router;