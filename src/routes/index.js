const express = require("express");
const routes = express.Router();

const UserRouter = require("./UserRouter");
const AuthRouter = require("./AuthRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require("./PaymentRouter");
const ProductTypeRouter = require("./ProductTypeRouter");
const ReviewRouter = require("./ReviewRouter");
const RoleRouter = require("./RoleRouter");
const CityRouter = require("./CityRouter");
const DeliveryTypeRouter = require("./DeliveryTypeRouter");
const PaymentTypeRouter = require("./PaymentTypeRouter");
const ReportRouter = require("./ReportRouter");
const NotificationRouter = require("./NotificationRouter");
const CommentRouter = require("./CommentRouter");

const AppointmentRouter = require("./Spa/AppointmentRouter");
const PackageRouter = require("./Spa/PackageRouter");
const ServiceRouter = require("./Spa/ServiceRouter");
const AboutRouter = require("./Spa/AboutRouter");
const BannerRouter = require("./Spa/BannerRouter");

// upload
const UploadImageRouter = require("./Spa/UploadImageRouter");

routes.use("/auth", AuthRouter);
routes.use("/users", UserRouter);
routes.use("/products", ProductRouter);
routes.use("/product-types", ProductTypeRouter);
routes.use("/orders", OrderRouter);
routes.use("/payment", PaymentRouter);
routes.use("/reviews", ReviewRouter);
routes.use("/roles", RoleRouter);
routes.use("/city", CityRouter);
routes.use("/delivery-type", DeliveryTypeRouter);
routes.use("/payment-type", PaymentTypeRouter);
routes.use("/report", ReportRouter);
routes.use("/notifications", NotificationRouter);
routes.use("/comments", CommentRouter);

routes.use("/appointments", AppointmentRouter);
routes.use("/packages", PackageRouter);
routes.use("/services", ServiceRouter);
routes.use("/about-us", AboutRouter);
routes.use("/banners", BannerRouter);

// upload image
routes.use("/upload-image", UploadImageRouter);

module.exports = routes;
