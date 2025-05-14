const express = require("express");
const router = express.Router();
const { CONFIG_PERMISSIONS } = require("@configs");
const { AuthPermission } = require("../../middleware/AuthPermission");
const AboutController = require("../../controllers/Spa/AboutController");

router.put(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.ABOUT.UPDATE),
  AboutController.updateAbout
);

router.get("/:id", AboutController.getDetailAbout);

module.exports = router;
