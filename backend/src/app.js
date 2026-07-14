import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorHandler.js';
import productRouter from './routes/productRoutes.js';

const app = express();

// 1. Security Hardening Layer 
app.use(helmet());

// 2. Dynamic CORS configuration mapping
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-frontend.vercel.app'] 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'], // Explicitly whitelist Vite dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Crucial if you use cookies/sessions later
}));

// 3. Global Rate Limiting Infrastructure (Must be applied BEFORE routes!)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    error: 'Too many requests generated from this network allocation endpoint. Please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api/', globalLimiter); // Apply limiter to all /api routes

// 4. Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 5. API Routes (Now fully rate-limited!)
app.use('/api/products', productRouter);

// Server Vital Metrics Diagnostics Route
app.get('/api/health', async (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 6. Fallback catch-all error handling layer (Must be at the very bottom)
app.use(errorHandler);

export default app;

// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import errorHandler from './middleware/errorHandler.js';
// import productRouter from './routes/productRoutes.js';


// const app = express();

// // Security Hardening Layer 
// app.use(helmet());

// // Dynamic CORS configuration mapping
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' ? ['https://your-vercel-frontend.vercel.app'] : '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use('/api/products', productRouter);

// // Global Rate Limiting Infrastructure
// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per window
//   message: 'Too many requests generated from this network allocation endpoint. Please try again later.'
// });
// app.use('/api/', globalLimiter);

// // Server Vital Metrics Diagnostics Route
// app.get('/api/health', async (req, res) => {
//   res.status(200).json({
//     status: 'healthy',
//     timestamp: new Date(),
//     environment: process.env.NODE_ENV
//   });
// });

// // Fallback catch-all error handling layer
// app.use(errorHandler);

// export default app;