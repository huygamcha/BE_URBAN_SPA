const express = require("express");
const router = express.Router();
const { CONFIG_PERMISSIONS } = require("../configs");
const { AuthPermission } = require("../middleware/AuthPermission");
const RevenueReportController = require("../controllers/RevenueReportController");

router.post(
  "/",
  AuthPermission(CONFIG_PERMISSIONS.REVENUE_REPORT.CREATE),
  RevenueReportController.createRevenueReport
);

router.put(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.REVENUE_REPORT.UPDATE),
  RevenueReportController.updateRevenueReport
);

router.get(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.REVENUE_REPORT.VIEW),
  RevenueReportController.getRevenueReportDetails
);

router.get(
  "/",
  AuthPermission(CONFIG_PERMISSIONS.REVENUE_REPORT.VIEW),
  RevenueReportController.getAllRevenueReports
);

router.delete(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.REVENUE_REPORT.DELETE),
  RevenueReportController.deleteRevenueReport
);

module.exports = router;

