const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", , "Completed", "Cancelled"],
      default: "Pending",
    },
    note: {
      type: String,
      default: "",
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: "vi",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    duration: {
      type: String,
      default: "10:00",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
