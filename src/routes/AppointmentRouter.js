const express = require("express");
const router = express.Router();
const { CONFIG_PERMISSIONS } = require("../configs");
const { AuthPermission } = require("../middleware/AuthPermission");
const AppointmentController = require("../controllers/AppointmentController");

router.post(
  "/",
  // AuthPermission(CONFIG_PERMISSIONS.APPOINTMENT.CREATE),
  AppointmentController.createAppointment
);

router.put(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.APPOINTMENT.UPDATE),
  AppointmentController.updateAppointment
);

router.get(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.APPOINTMENT.VIEW),
  AppointmentController.getAppointmentDetails
);

router.get(
  "/",
  // AuthPermission(CONFIG_PERMISSIONS.APPOINTMENT.VIEW),
  AppointmentController.getAllAppointments
);

router.delete(
  "/:id",
  // AuthPermission(CONFIG_PERMISSIONS.APPOINTMENT.DELETE),
  AppointmentController.deleteAppointment
);

module.exports = router;
