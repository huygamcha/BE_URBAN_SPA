const mongoose = require("mongoose");

const revenueReportSchema = new mongoose.Schema(
  {
    reportDate: {
      type: Date,
      required: true,
    },
    totalRevenue: {
      type: Number,
      required: true,
    },
    totalAppointments: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const RevenueReport = mongoose.model("RevenueReport", revenueReportSchema);

module.exports = RevenueReport;
