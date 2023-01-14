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
    // subscription: {
    //   type: String,
    //   enum: ["starter", "pro", "business"],
    //   default: "starter",
    // },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: false,
    },
    birthday: {
      type: String,
      default: "01.01.1900",
    },
    notieceId: {
      type: [{ type: Schema.Types.ObjectId }],
      default: null,
    },

    favoriteNotices: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      ref: "notice",
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: [true, "Verify token is required"],
    // },
  },
  { versionKey: false }
);

const registerSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().pattern(RegMailExp).required(),
  name: Joi.string().required().min(2),
  city: Joi.string().required(),
  phone: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().pattern(RegMailExp).required(),
});
// const verifyEmailSchema = Joi.object({
//   email: Joi.string().pattern(RegMailExp).required(),
// });

const schemas = {
  registerSchema,
  loginSchema,
  //   verifyEmailSchema,
};

const User = model("user", userShema);

module.exports = {
  User,
  schemas,
};
