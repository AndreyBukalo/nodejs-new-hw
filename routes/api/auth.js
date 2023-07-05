const express = require("express");
const { userCtrl } = require("../../controllers");
const { validateBody } = require("../../middlewares/");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.signUpSchema),
  userCtrl.registration
);
router.post("/signin",validateBody(schemas.signInSchema),userCtrl.login)
module.exports = router;
