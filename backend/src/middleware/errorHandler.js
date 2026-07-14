export default function errorHandler(err, req, res, next) {
  console.error('Unhandled Server Exception:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Enterprise Server Error Processing Request';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}