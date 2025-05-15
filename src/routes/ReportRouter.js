const express = require("express");
const router = express.Router();
const { CONFIG_PERMISSIONS } = require("@configs");
const { AuthPermission } = require("../middleware/AuthPermission");
const ReportController = require("../controllers/ReportController");

router.get(
  "/user-type/count",
  AuthPermission(CONFIG_PERMISSIONS.DASHBOARD),
  ReportController.getReportCountUser
);

// lịch hẹn
router.get(
  "/appointments",
  AuthPermission(CONFIG_PERMISSIONS.APPOINTMENTS),
  ReportController.getAllAppointments
);

router.get(
  "/all-records/spa/count",
  AuthPermission(CONFIG_PERMISSIONS.DASHBOARD),
  ReportController.getReportCountRecordsSpa
);

// tổng doanh thu
router.get(
  "/revenue-total",
  AuthPermission(CONFIG_PERMISSIONS.DASHBOARD),
  ReportController.getReportTotalRevenue
);

router.get(
  "/order-status/count",
  AuthPermission(CONFIG_PERMISSIONS.DASHBOARD),
  ReportController.getReportCountOrderStatus
);

module.exports = router;
