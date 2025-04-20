const express = require("express");
const router = express.Router();
const { CONFIG_PERMISSIONS } = require("../../configs");
const { AuthPermission } = require("../../middleware/AuthPermission");
const BlogController = require("../../controllers/Spa/BlogController");

router.post(
  "/",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.BLOG.CREATE),
  BlogController.createBlog
);

router.get("/random", BlogController.getRandomBlog);

router.put(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.BLOG.UPDATE),
  BlogController.updateBlog
);

router.get("/:id", BlogController.getDetailsBlog);

router.get("/slug/:id", BlogController.getBlogBySlug);

router.get("/", BlogController.getAllBlog);

router.delete(
  "/delete-many",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.BLOG.DELETE),
  BlogController.deleteMany
);

router.delete(
  "/:id",
  AuthPermission(CONFIG_PERMISSIONS.SETTING.BLOG.DELETE),
  BlogController.deleteBlog
);

module.exports = router;
