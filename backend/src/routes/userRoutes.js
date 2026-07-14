import express from 'express';

const router = express.Router();

// Base user route (for testing)
router.get('/', (req, res) => {
  res.status(200).json({
    message: "User authentication and profile endpoint is online"
  });
});

// Make sure this default export is present at the bottom!
export default router;