const express = require("express");
const router = express.Router();
const { CONFIG_PERMISSIONS } = require("../../configs");
const { AuthPermission } = require("../../middleware/AuthPermission");
const BannerController = require("../../controllers/Spa/BannerController");

router.post(
  "/",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.BANNER.CREATE),
  BannerController.createBanner
);

router.put(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.BANNER.UPDATE),
  BannerController.updateBanner
);

router.get("/:id", BannerController.getDetailsBanner);

router.get("/", BannerController.getAllBanner);

router.delete(
  "/delete-many",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.BANNER.DELETE),
  BannerController.deleteMany
);

router.delete(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.BANNER.DELETE),
  BannerController.deleteBanner
);

module.exports = router;
