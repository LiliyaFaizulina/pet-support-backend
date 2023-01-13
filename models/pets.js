const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for pets"],
    },
    birthday: {
      type: String,
      default: "01.01.1900",
    },
    breed: {
      type: String,
      default: "",
    },
    comments: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post("save", handleMongooseError);

const addPetSchema = Joi.object({
  name: Joi.string().required(),
  birthday: Joi.string(),
  breed: Joi.string().min(2).max(16),
  comments: Joi.string().min(8).max(120),
});

const schemasPet = { addPetSchema };

const Pet = model("pet", petSchema);

module.exports = { Pet, schemasPet };
