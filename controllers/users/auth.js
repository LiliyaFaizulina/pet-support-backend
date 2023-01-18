const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
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
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
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

module.exports = {
  login,
  register,
  logout,
  refreshToken,
};
