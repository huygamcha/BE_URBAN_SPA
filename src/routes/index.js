const express = require("express");
const routes = express.Router();

const UserRouter = require("./UserRouter");
const AuthRouter = require("./AuthRouter");
const RoleRouter = require("./RoleRouter");
const ReportRouter = require("./ReportRouter");

const AppointmentRouter = require("./Spa/AppointmentRouter");
const PackageRouter = require("./Spa/PackageRouter");
const ServiceRouter = require("./Spa/ServiceRouter");
const AboutRouter = require("./Spa/AboutRouter");
const BannerRouter = require("./Spa/BannerRouter");
const BlogRouter = require("./Spa/BlogRouter");

// upload
const UploadImageRouter = require("./Spa/UploadImageRouter");

routes.use("/auth", AuthRouter);
routes.use("/users", UserRouter);
routes.use("/roles", RoleRouter);
routes.use("/report", ReportRouter);

routes.use("/appointments", AppointmentRouter);
routes.use("/packages", PackageRouter);
routes.use("/services", ServiceRouter);
routes.use("/about-us", AboutRouter);
routes.use("/banners", BannerRouter);
routes.use("/blogs", BlogRouter);

// upload image
routes.use("/upload-image", UploadImageRouter);

module.exports = routes;
