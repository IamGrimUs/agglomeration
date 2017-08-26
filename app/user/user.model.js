const mongoose = require("mongoose");
const departmentModel = require("../department/department.model");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  biography: { type: String },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  departmentId: { type: String, required: true },
  departmentName: { type: String, required: true },
  position: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  favoritePartOfDay: { type: String },
  hobbies: { type: String },
  permission: { type: String },
  password: { type: String, required: true },
  salt: { type: String }
});

userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.methods.toClient = async function() {
  let department = await getDepartment(this.departmentId);
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
    // managerId: department ? department.managerId : null,
    // managerName: department ? await getManagerName(department.managerId) : null,
    position: this.position,
    state: this.state,
    country: this.country,
    favoritePartOfDay: this.favoritePartOfDay,
    hobbies: this.hobbies
  };
};

const user = mongoose.model("user", userSchema);

async function getDepartment(id) {
  if (!id) return;
  let department = await departmentModel.findById(id);
  return department;
}

// async function getManagerName(id) {
//   if (!id) return;
//   let manager = await user.findById(id);
//   return manager.fullName;
// }

module.exports = user;
