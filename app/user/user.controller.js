const userModel = require('./user.model');
const findAllUsers = (req, res) => {
  userModel.hashPassword('password').then(userPass => {});
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
    query.departmentId = { $regex: departmentId, $options: 'i' };
  }

  if (email) {
    query.email = { $regex: email, $options: 'i' };
  }

  if (firstName) {
    query.firstName = { $regex: firstName, $options: 'i' };
  }

  if (lastName) {
    query.lastName = { $regex: lastName, $options: 'i' };
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
      permission: req.body.permission,
      password: req.body.password
    })
    .then(async userModel => res.status(201).json(await userModel.toClient()))
    .catch(err => {
      console.error('err is', err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const updateUserById = async (req, res) => {
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
    'hobbies'
  ];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
  console.log('password:', req.body.password);
  if (req.body.password) {
    let pass = { password: await userModel.hashPassword(req.body.password) };
    console.log(pass);
    userModel
      .findByIdAndUpdate(req.params.userId, { $set: pass })
      .then(user => {
        console.log(user);
      });
  }

  userModel
    .findByIdAndUpdate(req.params.userId, { $set: toUpdate })
    .then(user => {
      console.log(user);
    })
    .then(userModel => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
};

const deleteUserById = (req, res) => {
  //(`this is the requested params id: `, req.params.userId);
  userModel
    .findByIdAndRemove({ _id: req.params.userId })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Interanl server error' }));
};

const uploadUserPhoto = (req, res) => {
  const toUpdate = { imageUrl: req.file.filename };
  userModel
    .findByIdAndUpdate(req.params.userId, { $set: toUpdate })
    .then(userModel => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
};

module.exports = {
  uploadUserPhoto,
  createNewUser,
  findUserById,
  findAllUsers,
  searchUser,
  updateUserById,
  deleteUserById
};
