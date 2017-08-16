const departmentModel = require("./department.model");

const findAllDepartments = (req, res) => {
  departmentModel
    .find()
    .then(departments => {
      res.json({
        departments: departments.map(department => department.toClient())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const findDepartmentById = (req, res) => {
  const departmentId = req.params.departmentId;
  departmentModel
    .findById(departmentId)
    .then(department => {
      res.json(department.toClient());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const createNewDepartment = (req, res) => {
  console.log(`hello`, req.body);
  departmentModel
    .create({
      name: req.body.name,
      managerId: req.body.managerId,
      directorId: req.body.directorId,
      vpId: req.body.vpId
    })
    .then(departmentModel => res.status(201).json(departmentModel.toClient()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const updateDepartmentById = (req, res) => {
  console.log("hello put request", req.params.departmentId);
  if (
    !(
      req.params.departmentId && req.body.departmentId === req.body.departmentId
    )
  ) {
    const message =
      `Request path id (${req.params.departmentId}) and request body id ` +
      `(${req.body.departmentId}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = ["name", "managerId", "directorId", "vpId"];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  departmentModel
    .findByIdAndUpdate(req.params.departmentId, { $set: toUpdate })
    .then(departmentModel => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
};

const deleteDepartmentById = (req, res) => {
  console.log(`this is the requested params id: `, req.params.departmentId);
  departmentModel
    .findByIdAndRemove({ _id: req.params.departmentId })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Interanl server error" }));
};

module.exports = {
  findAllDepartments,
  findDepartmentById,
  createNewDepartment,
  updateDepartmentById,
  deleteDepartmentById
};
