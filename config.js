exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  'mongodb://localhost/agglomeration';
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-restaurants-app';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = 'jabawakey';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
