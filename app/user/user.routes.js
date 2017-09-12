const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const multer = require('multer');

const userController = require('./user.controller');
const { jwtStrategy } = require('../auth/auth.strategies');
const jsonParser = bodyParser.json();
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: 'public/img/profile',
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  userController.searchUser
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.findAllUsers
);
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  userController.findUserById
);
router
  .all(upload.single('profileImage'))
  .post(
    '/user/:userId/photo',
    passport.authenticate('jwt', { session: false }),
    userController.uploadUserPhoto
  );
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.createNewUser
);

router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  userController.updateUserById
);
router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUserById
);

module.exports = router;
