const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const packageSchema = new Schema(
  {
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    nameEn: {
      type: String,
      unique: true,
      required: true,
    },
    nameKo: {
      type: String,
      unique: true,
      required: true,
    },
    nameJp: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    booking: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Package = model("Package", packageSchema);

module.exports = Package;
