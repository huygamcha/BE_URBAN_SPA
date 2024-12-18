const mongoose = require("mongoose");

const optionServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },
    titleKo: {
      type: String,
      unique: true,
      require: true,
    },
    titleJp: {
      type: String,
      unique: true,
      require: true,
    },
    titleEn: {
      type: String,
      unique: true,
      require: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nameKo: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    nameJp: {
      type: String,
      required: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    options: [optionServiceSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
