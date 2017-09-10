const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');

const userController = require('./user.controller');
const { jwtStrategy } = require('../auth/auth.strategies');
const jsonParser = bodyParser.json();
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

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
//router.post('/', jsonParser, userController.createUserLogin);
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
