const { Schema, model } = require("mongoose");
const Joi = require("joi");

const RegMailExp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: RegMailExp,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: false,
    },
    birthday: {
      type: String,
      default: "1980-01-01",
    },
    notieceId: {
      type: [{ type: Schema.Types.ObjectId }],
      default: null,
    },

    favoriteNotices: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      ref: "notices",
    },
  },
  { versionKey: false }
);

const registerSchema = Joi.object({
  password: Joi.string().required().min(7).max(32),
  email: Joi.string().pattern(RegMailExp).required(),
  name: Joi.string().required().min(2),
  city: Joi.string().required(),
  phone: Joi.string().required(),
});
const userUpdateSchema = Joi.object({
  email: Joi.string(),
  name: Joi.string(),
  city: Joi.string(),
  phone: Joi.string(),
  birthday: Joi.string(),
});
const loginSchema = Joi.object({
  password: Joi.string().required().min(7).max(32),
  email: Joi.string().pattern(RegMailExp).required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const updatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const restorePasswordSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  userUpdateSchema,
  refreshTokenSchema,
  updatePasswordSchema,
  restorePasswordSchema,
};

const User = model("user", userShema);

module.exports = {
  User,
  schemas,
};
