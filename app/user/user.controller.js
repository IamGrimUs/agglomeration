const userModel = require('./user.model');

export const findAllUsers = (req, res) => {
  userModel
    .find()
    .then(users => {
      res.json({
        users: users.map(
          (user) => user.toClient())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
};

export const findUserById = (req, res) => {
 const userId = req.params.userId;
 userModel
  .findById(userId) 
  .then()
  .catch(
    err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
};