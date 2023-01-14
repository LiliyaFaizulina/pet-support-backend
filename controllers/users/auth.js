const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
// const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
// const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers/index");
require("dotenv").config();
const {
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET,
  CLOUD_NAME,
} = process.env;

cloudinary.config({
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
  cloud_name: CLOUD_NAME,
});

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

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "3m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.json({
    user: {
      email: user.email,
      name: user.name,
      city: user.city,
      phone: user.phone,
      avatarURL: user.avatarURL,
    },
    accessToken,
    refreshToken,
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
  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });
  res.json({
    message: "Logout success",
  });
};
const updateUserById = async (req, res) => {
  const { id } = req.params;

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "User not found");
  }
  res.json({
    name: result.name,
    city: result.city,
    phone: result.phone,
    email: result.email,
    birthday: result.birthday,
  });
};
const editAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload } = req.file;
  const { url } = await cloudinary.uploader.upload(tempUpload);
  const avatarURL = url;
  await User.findByIdAndUpdate(_id, { avatarURL });
  fs.unlink(tempUpload);
  res.json({
    avatarURL,
  });
};

const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const isValid = await User.findOne({ refreshToken: token });
    if (!isValid) {
      throw HttpError(403, "invalid signature");
    }
    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "3m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

module.exports = {
  login: ctrlWrapper(login),
  register: ctrlWrapper(register),
  updateUserById: ctrlWrapper(updateUserById),
  editAvatar: ctrlWrapper(editAvatar),
  //   verify: ctrlWrapper(verify),
  //   resendVerifyEmail: ctrlWrapper(resendVerifyEmail)
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  refreshToken: ctrlWrapper(refreshToken),
};
