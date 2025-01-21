const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
