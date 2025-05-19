require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  UPLOAD_LIMIT: process.env.UPLOAD_LIMIT || '10mb',
  REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  NODE_ENV: process.env.NODE_ENV || 'development'
};