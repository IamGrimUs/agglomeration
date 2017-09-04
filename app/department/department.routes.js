const bodyParser = require('body-parser');
const departmentController = require('./department.controller');
const express = require('express');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', departmentController.findAllDepartments);
router.get('/:departmentId', departmentController.findDepartmentById);
router.post('/', departmentController.createNewDepartment);
router.put('/:departmentId', departmentController.updateDepartmentById);
router.delete('/:departmentId', departmentController.deleteDepartmentById);

module.exports = router;
