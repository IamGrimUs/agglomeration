exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  'mongodb://grimus:toothPile333@ds135594.mlab.com:35594/agglomeration';
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-agglomeration';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = 'jabawakey';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';
