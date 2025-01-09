const mongoose = require("mongoose");

// Schema cho option services
const optionServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    titleKo: {
      type: String,
      unique: true,
      required: true,
    },
    titleJp: {
      type: String,
      unique: true,
      required: true,
    },
    titleEn: {
      type: String,
      unique: true,
      required: true,
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

// Schema cho services
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
    options: [optionServiceSchema], // Dùng schema con cho các tùy chọn
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
