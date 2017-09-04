const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./app/user/user.routes');
const departmentRouter = require('./app/department/department.routes');
const passport = require('passport');
const morgan = require('morgan');
const authRouter = require('./app/auth/auth.routes');
const { PORT, DATABASE_URL } = require('./config');

const { jwtStrategy } = require('./app/auth/auth.strategies');

const app = express();

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use('/user', userRouter);
app.use('/department', departmentRouter);
app.use('/auth', authRouter);

let server;

app.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return res.status(401).json({ message: 'Not logged in' });
  }
  res.status(200).sendFile(__dirname + '/public/index.html', {
    user: req.user.toClient()
  });
});

app.get('/login', (req, res) => {
  res.status(200).sendFile(__dirname + '/public/login.html');
});

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app
        .listen(port, () => {
          console.log(
            'time --> ' + new Date(),
            `Your app is listening on port ${port}`
          );
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
