const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const User = require('../user/user.model');
const config = require('../../config');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

router.post('/login', (req, res) => {
  console.log('test before createAuthToken');
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  console.log(userEmail, userPassword);
  User.findOne({ email: userEmail })
    .then(user => {
      if (!user) {
        // Return a rejected promise so we break out of the chain of .thens.
        // Any errors like this will be handled in the catch block.
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect email or password 1'
        });
      }
      return user.validatePassword(userPassword);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect email or password 2'
        });
      }
      const authToken = createAuthToken(req.user.toClient());
      res.status(200).json({ authToken });
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return res.status(401).json({ message: err.message });
      }
      console.log(err.stack);
      res.status(500).json({ message: err.message });
    });
});

router.post(
  '/refresh',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({ authToken });
  }
);

module.exports = router;
