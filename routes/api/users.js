const express = require("express");

const ctrl = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../midlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/logout", authenticate, ctrl.logout);

router.put("/avatar", authenticate, upload.single("avatar"), ctrl.editAvatar);
router.get("/user", authenticate, ctrl.getUser);
router.put(
  "/user",
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
