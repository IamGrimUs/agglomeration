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
    managerId: this.managerId,
    directorId: this.directorId,
    vpId: this.vpId
  };
};

const department = mongoose.model("department", departmentSchema);

module.exports = department;
