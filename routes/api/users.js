const express = require("express");

const ctrl = require("../../controllers/users/auth");

const { validateBody, authenticate, upload } = require("../../midlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
// router.get("/verify/:verificationToken", ctrl.verify);

// router.post(
//   "/verify",
//   validateBody(schemas.verifyEmailSchema),
//   ctrl.resendVerifyEmail
// );

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

router.put("/avatar", authenticate, upload.single("avatar"), ctrl.editAvatar);
router.put(
  "/:id",
  authenticate,
  validateBody(schemas.userUpdateSchema),
  ctrl.updateUserById
);

router.post(
  "/refresh",
  validateBody(schemas.refreshTokenSchema),
  ctrl.refreshToken
);

module.exports = router;
