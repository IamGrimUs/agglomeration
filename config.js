exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb+srv://grimus:<password>@agglomeration.20ub1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-agglomeration'
exports.PORT = process.env.PORT || 8080
exports.JWT_SECRET = 'jabawakey'
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '1d'
exports.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET
exports.CLOUDINARY_KEY = process.env.CLOUDINARY_KEY
