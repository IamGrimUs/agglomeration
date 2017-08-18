const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const userController = require("./user.controller");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", userController.findAllUsers);
router.get("/:userId", userController.findUserById);
router.get("/search/:searchTerm", userController.searchUser);
router.post("/", userController.createNewUser);
router.put("/:userId", userController.updateUserById);
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
