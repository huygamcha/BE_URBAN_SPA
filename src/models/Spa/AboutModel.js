const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const aboutSchema = new Schema(
  {
    name: {
      type: String,
    },
    nameEn: {
      type: String,
    },
    nameKo: {
      type: String,
    },
    nameJp: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const About = model("About", aboutSchema);

module.exports = About;
