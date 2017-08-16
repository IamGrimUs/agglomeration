const userModel = require("./user.model");

const findAllUsers = (req, res) => {
  userModel
    .find()
    .then(users => {
      res.json({
        users: users.map(user => user.toClient())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const findUserById = (req, res) => {
  const userId = req.params.userId;
  userModel
    .findById(userId)
    .then(user => {
      res.json(user.toClient());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const createNewUser = (req, res) => {
  console.log(`hello`, req.body);
  userModel
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      departmentId: req.body.departmentId,
      position: req.body.position,
      managerId: req.body.managerId,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      dateHired: req.body.dateHired,
      favoritePartOfDay: req.body.favoritePartofDay,
      permission: req.body.permission,
      password: req.body.password
    })
    .then(userModel => res.status(201).json(userModel.toClient()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const updateUserById = (req, res) => {
  console.log("hello put request", req.params.userId);
  if (!(req.params.userId && req.body.userId === req.body.userId)) {
    const message =
      `Request path id (${req.params.userId}) and request body id ` +
      `(${req.body.userId}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = [
    "firstName",
    "lastName",
    "email",
    "departmentId",
    "position",
    "managerId",
    "city",
    "state",
    "country",
    "dateHired",
    "personalityQuerks",
    "favoritePartOfDay",
    "hobbies",
    "password"
  ];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  userModel
    .findByIdAndUpdate(req.params.userId, { $set: toUpdate })
    .then(userModel => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
};

const deleteUserById = (req, res) => {
  console.log(`this is the requested params id: `, req.params.userId);
  userModel
    .findByIdAndRemove({ _id: req.params.userId })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Interanl server error" }));
};

module.exports = {
  createNewUser,
  findUserById,
  findAllUsers,
  updateUserById,
  deleteUserById
};
