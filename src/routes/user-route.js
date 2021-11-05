const express = require("express");
const router = express.Router();
const USER_CONT = require("../controller/user-controller");
 const { validation } = require("../validation");



router.post("/user-create", validation.userAddValidation, USER_CONT.userCreate);

router.get("/user-list", USER_CONT.userList)

router.get("/user-status/:id",  USER_CONT.userStatus)

router.patch("/user-edit-points/:id", validation.userPointValidation,  USER_CONT.userEdit)






module.exports = router