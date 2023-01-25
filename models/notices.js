const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title"],
      text: true,
    },
    petName: {
      type: String,
      required: [true, "Set name for pet"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    breed: {
      type: String,
      default: "",
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["lost-found", "for-free", "sell"],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post("save", handleMongooseError);
const Notice = model("notice", noticeSchema);

const addSchema = Joi.object({
  title: Joi.string().required(),
  petName: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  sex: Joi.string().allow("male", "female"),
  location: Joi.string().required(),
  price: Joi.number(),
  breed: Joi.string(),
  comments: Joi.string(),
  category: Joi.string().allow("lost-found", "for-free", "sell").required(),
});

const schemas = { addSchema };

module.exports = { Notice, schemas };
