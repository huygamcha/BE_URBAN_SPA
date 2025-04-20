const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema(
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
    description: {
      type: String,
    },
    descriptionEn: {
      type: String,
    },
    descriptionKo: {
      type: String,
    },
    descriptionJp: {
      type: String,
    },
    slug: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
