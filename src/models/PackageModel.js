const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const packageSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
    },
    nameEn: {
      type: String,
      unique: true,
      require: true,
    },
    nameKo: {
      type: String,
      unique: true,
      require: true,
    },
    nameJp: {
      type: String,
      unique: true,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    descriptionKo: {
      type: String,
      require: true,
    },
    descriptionJp: {
      type: String,
      require: true,
    },
    descriptionEn: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Package = model("Package", packageSchema);

module.exports = Package;
