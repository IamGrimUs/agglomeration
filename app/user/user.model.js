const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  departmentId: { type: String },
  position: { type: String, required: true },
  managerId: { type: String, required: false },
  city: { type: String },
  state: { type: String },
  country: { type: String, required: true },
  dateHired: { type: Date },
  personalityQuerks: { type: String },
  favoritePartOfDay: { type: String },
  hobbies: { type: String },
  permission: { type: String, required: true },
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
    departmentId: this.departmentId,
    position: this.position,
    managerId: this.managerId,
    city: this.city,
    state: this.state,
    country: this.country,
    dateHired: this.dateHired,
    favoritePartOfDay: this.favoritePartOfDay
  };
};

const user = mongoose.model("user", userSchema);

module.exports = user;
