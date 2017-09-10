const userModel = require('./user.model');
const findAllUsers = (req, res) => {
  userModel.hashPassword('password').then(userPass => {
    // console.log('userPass:');
    // console.log(userPass);
  });
  userModel
    .find()
    .then(async users => {
      let promises = users.map(async user => await user.toClient());
      res.json({
        users: await Promise.all(promises)
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const findUserById = (req, res) => {
  const userId = req.params.userId;
  userModel
    .findById(userId)
    .then(async user => {
      res.json(await user.toClient());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const searchUser = (req, res) => {
  let query = {};
  const departmentId = req.query.departmentId;
  const email = req.query.email;
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;

  if (departmentId) {
    query.departmentId = departmentId;
  }

  if (email) {
    query.email = email;
  }

  if (firstName) {
    query.firstName = firstName;
  }

  if (lastName) {
    query.lastName = lastName;
  }

  userModel
    .find(query)
    .then(async users => {
      let promises = users.map(async user => await user.toClient());
      res.json({
        users: await Promise.all(promises)
      });
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
    });
};

// const createUserLogin = (req, res) => {
//   const requiredFields = ["userEmail", "userPassword"];
//   const missingField = requiredFields.find(field => !(field in req.body));

//   if (missingField) {
//     return res.status(422).json({
//       code: 422,
//       reason: "ValidationError",
//       message: "Missing field",
//       location: missingField
//     });
//   }

//   const stringFields = ["userEmail", "userPassword"];
//   const nonStringField = stringFields.find(
//     field => field in req.body && typeof req.body[field] !== "string"
//   );

//   if (nonStringField) {
//     return res.status(422).json({
//       code: 422,
//       reason: "ValidationError",
//       message: "Incorrect field type: expected string",
//       location: nonStringField
//     });
//   }

//   const explicityTrimmedFields = ["userEmail", "userPassword"];
//   const nonTrimmedField = explicityTrimmedFields.find(
//     field => req.body[field].trim() !== req.body[field]
//   );

//   if (nonTrimmedField) {
//     return res.status(422).json({
//       code: 422,
//       reason: "ValidationError",
//       message: "Cannot start or end with whitespace",
//       location: nonTrimmedField
//     });
//   }

//   const sizedFields = {
//     userEmail: {
//       min: 7
//     },
//     userPassword: {
//       min: 10,
//       // bcrypt truncates after 72 characters, so let's not give the illusion
//       // of security by storing extra (unused) info
//       max: 72
//     }
//   };
//   const tooSmallField = Object.keys(sizedFields).find(
//     field =>
//       "min" in sizedFields[field] &&
//       req.body[field].trim().length < sizedFields[field].min
//   );
//   const tooLargeField = Object.keys(sizedFields).find(
//     field =>
//       "max" in sizedFields[field] &&
//       req.body[field].trim().length > sizedFields[field].max
//   );

//   if (tooSmallField || tooLargeField) {
//     return res.status(422).json({
//       code: 422,
//       reason: "ValidationError",
//       message: tooSmallField
//         ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
//         : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
//       location: tooSmallField || tooLargeField
//     });
//   }

//   let { userEmail, userPassword } = req.body;

//   return userModel
//     .find({ userEmail })
//     .count()
//     .then(count => {
//       if (count > 0) {
//         // There is an existing user with the same user email
//         return Promise.reject({
//           code: 422,
//           reason: "ValidationError",
//           message: "User email already taken",
//           location: "userEmail"
//         });
//       }
//       // If there is no existing user, hash the password
//       return userModel.hashPassword(userPassword);
//     })
//     .then(hash => {
//       return userModel.create({
//         userEmail,
//         password: hash
//       });
//     })
//     .then(user => {
//       return res.status(201).json(user.toClient());
//     })
//     .catch(err => {
//       // Forward validation errors on to the client, otherwise give a 500
//       // error because something unexpected has happened
//       if (err.reason === "ValidationError") {
//         return res.status(err.code).json(err);
//       }
//       res.status(500).json({ code: 500, message: "Internal server error" });
//     });
// };

const createNewUser = (req, res) => {
  userModel
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      biography: req.body.biography,
      email: req.body.email,
      telephone: req.body.telephone,
      departmentId: req.body.departmentId,
      position: req.body.position,
      state: req.body.state,
      country: req.body.country,
      favoritePartOfDay: req.body.favoritePartOfDay,
      hobbies: req.body.hobbies,
      // permission: req.body.permission,
      password: req.body.password
    })
    .then(async userModel => res.status(201).json(await userModel.toClient()))
    .catch(err => {
      console.error('err is', err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const updateUserById = (req, res) => {
  console.log('hello put request', req.params.userId);
  if (!(req.params.userId && req.body.userId === req.body.userId)) {
    const message =
      `Request path id (${req.params.userId}) and request body id ` +
      `(${req.body.userId}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = [
    'firstName',
    'lastName',
    'biography',
    'email',
    'telephone',
    'position',
    'departmentName',
    'state',
    'country',
    'favoritePartOfDay',
    'hobbies',
    'password'
  ];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  userModel
    .findByIdAndUpdate(req.params.userId, { $set: toUpdate })
    .then(userModel => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
};

const deleteUserById = (req, res) => {
  console.log(`this is the requested params id: `, req.params.userId);
  userModel
    .findByIdAndRemove({ _id: req.params.userId })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Interanl server error' }));
};

module.exports = {
  //  createUserLogin,
  createNewUser,
  findUserById,
  findAllUsers,
  searchUser,
  updateUserById,
  deleteUserById
};
