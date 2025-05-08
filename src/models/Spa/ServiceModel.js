const mongoose = require("mongoose");

// Schema cho option services
const optionServiceSchema = new mongoose.Schema(
  {
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
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
    description: {
      type: String,
      required: true,
    },
    descriptionKo: {
      type: String,
      required: true,
    },
    descriptionJp: {
      type: String,
      required: true,
    },
    descriptionEn: {
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
