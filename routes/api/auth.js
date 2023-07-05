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

module.exports = router;
