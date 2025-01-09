const express = require("express");
const router = express.Router();
const { CONFIG_PERMISSIONS } = require("@configs");
const { AuthPermission } = require("../../middleware/AuthPermission");
const ServiceController = require("../../controllers/Spa/ServiceController");

router.post(
  "/",
  AuthPermission(CONFIG_PERMISSIONS.SERVICE.CREATE),
  ServiceController.createService
);

router.put(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.SERVICE.UPDATE),
  ServiceController.updateService
);

router.get(
  "/:id",
  // AuthPermission(CONFIG_PERMISSIONS.SERVICE.VIEW),
  ServiceController.getDetailService
);

router.get(
  "/",
  // AuthPermission(CONFIG_PERMISSIONS.SERVICE.VIEW),
  ServiceController.getAllService
);

router.delete(
  "/delete-many",
  AuthPermission(CONFIG_PERMISSIONS.SERVICE.DELETE),
  ServiceController.deleteMany
);

router.delete(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.SERVICE.DELETE),
  ServiceController.deleteService
);

module.exports = router;
