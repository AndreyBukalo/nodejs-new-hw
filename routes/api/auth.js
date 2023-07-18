const express = require("express");
const { userCtrl } = require("../../controllers");
const { validateBody, authenticate, upload } = require("../../middlewares/");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.signUpSchema),
  userCtrl.registration
);

router.get("/verify/:verificationCode", userCtrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  userCtrl.resendVerifyEmail
);
router.post("/signin", validateBody(schemas.signInSchema), userCtrl.login);
module.exports = router;

router.get("/current", authenticate, userCtrl.getCurrent);

router.post("/logout", authenticate, userCtrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  userCtrl.updateAvatar
);
