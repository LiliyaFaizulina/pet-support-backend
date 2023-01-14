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
      type: Date,
      default: new Date(),
    },
    breed: {
      type: String,
      default: "",
    },
    comments: {
      type: String,
      default: "",
    },
    petAvatar: {
      type: String,
      default: "",
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

petSchema.post("save", handleMongooseError);

const addPetSchema = Joi.object({
  name: Joi.string().required(),
  birthday: Joi.string(),
  breed: Joi.string().min(2).max(16),
  comments: Joi.string().min(8).max(120),
  // avatar: Joi.string().required(),
});

const schemasPet = { addPetSchema };

const Pet = model("pet", petSchema);

module.exports = { Pet, schemasPet };
