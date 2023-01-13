const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const newSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

newSchema.post("save", handleMongooseError);
const New = model("new", newSchema);

module.exports = New;
