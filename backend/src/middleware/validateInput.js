export const validateProductInput = (req, res, next) => {
  const { name, price, description } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Security Validation Error: Invalid or missing asset identifier.' });
  }

  if (!price || isNaN(price) || Number(price) <= 0) {
    return res.status(400).json({ success: false, message: 'Security Validation Error: Target asset valuation parameter must be a positive numeric metric.' });
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    return res.status(400).json({ success: false, message: 'Security Validation Error: Asset structural description details must exceed 10 characters.' });
  }

  // Sanitize values from malicious scripts
  req.body.name = name.replace(/[<>]/g, '');
  req.body.description = description.replace(/[<>]/g, '');

  next();
};