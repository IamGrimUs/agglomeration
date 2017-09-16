const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const departmentModel = require('../department/department.model');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  biography: { type: String },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  departmentId: { type: String, required: true },
  departmentName: { type: String },
  position: { type: String, required: true },
  state: { type: String },
  country: { type: String },
  favoritePartOfDay: { type: String },
  hobbies: { type: String },
  permission: { type: Number },
  password: { type: String, required: true },
  imageUrl: { type: String }
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.methods.toClient = async function() {
  let department = await getDepartment(this.departmentId);
  //check for image url to be populated.

  return {
    id: this._id,
    fullName: this.fullName,
    firstName: this.firstName,
    lastName: this.lastName,
    biography: this.biography,
    email: this.email,
    telephone: this.telephone,
    departmentId: this.departmentId,
    departmentName: department ? department.name : null,
    position: this.position,
    permission: this.permission,
    state: this.state,
    country: this.country,
    favoritePartOfDay: this.favoritePartOfDay,
    hobbies: this.hobbies,
    imageUrl: this.imageUrl || 'generic-profile.png'
  };
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const user = mongoose.model('user', userSchema);

async function getDepartment(id) {
  if (!id) return;
  let department = await departmentModel.findById(id);
  return department;
}

module.exports = user;
