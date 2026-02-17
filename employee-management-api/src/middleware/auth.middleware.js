const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'employeelogin');

    // Attach user info from token (comes from DB via login)
    req.user = {
      employeeId: decoded.employeeId,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error('JWT auth error:', err.message);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = {
  authenticate,
};
