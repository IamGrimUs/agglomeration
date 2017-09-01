const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

const jsonParser = bodyParser.json();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/search", userController.searchUser);
router.get("/", userController.findAllUsers);
router.get("/:userId", userController.findUserById);
router.post("/", jsonParser, userController.createUserLogin);
router.post("/", userController.createNewUser);
router.put("/:userId", userController.updateUserById);
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
