// backend/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// 1. Core Config & Database Import (Forcing db.js to execute)
dotenv.config();
import db from './src/config/db.js'; 

// Router & Middleware Imports
import productRouter from './src/routes/productRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import errorHandler from './src/middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 2. CORS Configurations (Explicitly whitelisting local React/Vite development ports)
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-frontend.vercel.app'] 
    : [
        'http://localhost:5173', 'http://127.0.0.1:5173',
        'http://localhost:5174', 'http://127.0.0.1:5174'
      ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 3. Middlewares
app.use(helmet());
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter);

// 4. Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 5. Error Handling Middleware (Keep this last!)
app.use(errorHandler);

// 6. Start Server
app.listen(PORT, () => {
  console.log(`AuraPremium Server running on port ${PORT}`);
});

export default app;