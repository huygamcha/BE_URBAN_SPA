const express = require("express");
const router = express.Router();
const { CONFIG_PERMISSIONS } = require("../configs");
const { AuthPermission } = require("../middleware/AuthPermission");
const PackageController = require("../controllers/PackageController");

router.post(
  "/",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.PACKAGE.CREATE),
  PackageController.createPackage
);

router.put(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.PACKAGE.UPDATE),
  PackageController.updatePackage
);

router.get("/:id", PackageController.getDetailsPackage);

router.get("/", PackageController.getAllPackage);

router.delete(
  "/delete-many",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.PACKAGE.DELETE),
  PackageController.deleteMany
);

router.delete(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.PACKAGE.DELETE),
  PackageController.deletePackage
);

module.exports = router;
