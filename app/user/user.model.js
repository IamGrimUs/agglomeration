const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String },
  departmentId: { type: String },
  position: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  country: { type: String, required: true },
  dateHired: { type: Date },
  favoritePartOfDay: { type: String },
  hobbies: { type: String },
  permission: { type: String },
  password: { type: String, required: true },
  salt: { type: String }
});

userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.methods.toClient = function() {
  return {
    id: this._id,
    fullName: this.fullName,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    telephone: this.telephone,
    departmentId: this.departmentId,
    position: this.position,
    state: this.state,
    country: this.country,
    dateHired: this.dateHired,
    favoritePartOfDay: this.favoritePartOfDay,
    hobbies: this.hobbies
  };
};

const user = mongoose.model("user", userSchema);

module.exports = user;
