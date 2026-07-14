// backend/src/routes/orderRoutes.js
import express from 'express';
import { createOrder } from '../controllers/orderController.js'; // Ensure the .js extension is present

const router = express.Router();

router.post('/', createOrder);

export default router;