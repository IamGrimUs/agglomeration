const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  name: { type: String, required: true },
  managerId: { type: String },
  directorId: { type: String },
  vpId: { type: String }
});

departmentSchema.methods.toClient = function() {
  return {
    id: this._id,
    name: this.name,
    manager: this.managerId,
    director: this.directorId,
    vp: this.vpId
  };
};

const department = mongoose.model("department", departmentSchema);

module.exports = department;
