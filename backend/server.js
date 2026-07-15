// backend/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// 1. MUST load environment variables FIRST
dotenv.config();

// 2. NOW initialize Cloudinary with the loaded variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 3. Core Config & Database Import
import db from './src/config/db.js'; 

// Router & Middleware Imports
import orderRouter from './src/routes/orderRoutes.js';
import productRouter from './src/routes/productRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import categoryRouter from './src/routes/categoryRoutes.js'; 
import messageRouter from './src/routes/messageRoutes.js'; 
import errorHandler from './src/middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://aura-premium-five.vercel.app'] 
    : [
        'http://localhost:5173', 'http://127.0.0.1:5173',
        'http://localhost:5174', 'http://127.0.0.1:5174',
        'http://localhost:3000', 'http://127.0.0.1:3000'
      ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middlewares
app.use(helmet());
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter);

// Routes
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/messages', messageRouter);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error Handling Middleware (Keep this last!)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`AuraPremium Server running on port ${PORT}`);
});

export default app;