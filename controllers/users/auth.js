const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { nanoid } = require("nanoid");
require("dotenv").config();
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  const payload = {
    id: newUser._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });
  await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });

  res.status(201).json({
    user: {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      city: newUser.city,
      phone: newUser.phone,
      avatarURL: newUser.avatarURL,
      birthday: newUser.birthday,
      favoriteNotices: newUser.favoriteNotices,
    },
    accessToken,
    refreshToken,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(400, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      city: user.city,
      phone: user.phone,
      avatarURL: user.avatarURL,
      birthday: user.birthday,
      favoriteNotices: user.favoriteNotices,
    },
    accessToken,
    refreshToken,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });
  res.json({
    message: "Logout success",
  });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const { id } = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    const isValid = await User.findOne({ refreshToken });
    if (!isValid) {
      throw HttpError(403, "invalid signature");
    }
    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

const restorePassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Not found");
  }

  const newPassword = nanoid();
  const hashPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { password: hashPassword }
  );

  if (!updatedUser) {
    throw HttpError(404, "Not found");
  }

  const infoEmail = {
    to: email,
    subject: "Restore access",
    html: `<p>Your new password for petly: ${newPassword}</p> <p>You can change it in your account</p>`,
  };

  await sendEmail(infoEmail);
  res.json({ message: "New password was sent on your email" });
};

module.exports = {
  login,
  register,
  logout,
  refreshToken,
  restorePassword,
};
