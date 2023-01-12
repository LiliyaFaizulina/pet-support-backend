const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
// const path = require("path");
// const fs = require("fs/promises");
// const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers/index");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  //   const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    // verificationToken,
  });

  //   const verifyEmail = {
  //     to: email,
  //     subject: "Verify your email",
  //     html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify your email</a>`,
  //   };

  //   await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
  });
};

// const verify = async (req, res) => {
//   const { verificationToken } = req.params;
//   const user = await User.findOne({ verificationToken });
//   if (!user) {
//     throw HttpError(404, "User not found");
//   }
//   await User.findByIdAndUpdate(user._id, {
//     verify: true,
//     verificationToken: "",
//   });
//   res.json({
//     message: "Verification successful",
//   });
// };

// const resendVerifyEmail = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(404, "User not found");
//   }
//   if (user.verify) {
//     throw HttpError(400, "Verification has alredy been passed");
//   }
//   const verifyEmail = {
//     to: email,
//     subject: "Verify your email",
//     html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
//   };

//   await sendEmail(verifyEmail);
//   res.json({
//     message: "Verification email sent",
//   });
// };

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  //   if (!user.verify) {
  //     throw HttpError(400, "Email not verify");
  //   }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: {
      email: user.email,
      name: user.name,
      city: user.city,
      phone: user.phone,
      avatarURL: user.avatarURL,
    },
    token,
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout success",
  });
};

module.exports = {
  login: ctrlWrapper(login),
  register: ctrlWrapper(register),
  //   verify: ctrlWrapper(verify),
  //   resendVerifyEmail: ctrlWrapper(resendVerifyEmail)
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
