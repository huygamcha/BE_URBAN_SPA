const { CONFIG_MESSAGE_ERRORS, CONFIG_USER_TYPE } = require("@configs");
const Product = require("@models/ProductModel");
const User = require("@models/UserModel");
const Order = require("@models/OrderProduct");
const Review = require("@models/ReviewModel");
const Comment = require("@models/CommentModel");
const Package = require("../models/Spa/PackageModel");
const Appointment = require("../models/Spa/AppointmentModel");
const moment = require("moment/moment");

const getReportCountProductType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: {
              type: "$type", // Group by type ObjectId
              status: "$status",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.type", // Group by type ObjectId
            countsByStatus: {
              $push: {
                status: { $toString: "$_id.status" },
                count: "$count",
              },
            },
            total: { $sum: "$count" },
          },
        },
        {
          $lookup: {
            from: "producttypes", // Assuming the name of the collection is producttypes
            localField: "_id",
            foreignField: "_id",
            as: "type",
          },
        },
        {
          $unwind: "$type",
        },
        {
          $project: {
            _id: 0,
            typeName: "$type.name",
            countsByStatus: {
              $arrayToObject: {
                $map: {
                  input: "$countsByStatus",
                  as: "statusCount",
                  in: {
                    k: "$$statusCount.status",
                    v: {
                      count: "$$statusCount.count",
                    },
                  },
                },
              },
            },
            total: 1,
          },
        },
      ];

      const productCountByTypeAndStatus = await Product.aggregate(pipeline);

      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: productCountByTypeAndStatus,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReportCountRecords = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCount = await User.countDocuments();
      const productCount = await Product.countDocuments();
      const orderCount = await Order.countDocuments();
      const reviewCount = await Review.countDocuments();
      const commentCount = await Comment.countDocuments();

      const totalRevenue = await Order.aggregate([
        {
          $match: {
            status: "Completed", // Lọc các đơn hàng có trạng thái Completed
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalPrice" },
          },
        },
      ]);

      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: {
          user: userCount,
          product: productCount,
          order: orderCount,
          review: reviewCount,
          revenue: totalRevenue?.[0]?.total,
          comment: commentCount,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllAppointments = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { start, end } = data;

      // Giữ nguyên giá trị thời gian bằng chuỗi ISO
      const startDate = new Date(`${start}T00:00:00.000Z`); // Thời gian UTC
      const endDate = new Date(`${end}T23:59:59.999Z`); // Thời gian UTC

      // Aggregate pipeline
      const totalAppointments = await Appointment.aggregate([
        {
          $lookup: {
            from: "packages",
            localField: "packageId",
            foreignField: "_id",
            as: "package",
          },
        },
        {
          $match: {
            appointmentDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $addFields: {
            // title: "$name", // Rename 'name' to 'title'
            // namePackage: "$package.name",
            start: "$appointmentDate", // Rename 'appointmentDate' to 'start'
            end: {
              $add: ["$appointmentDate", 3600000], // Add 1 hour (3600000 ms) to 'appointmentDate'
            },
            title: {
              $concat: [
                { $toString: "$name" }, // Chuyển 'appointmentDate' thành chuỗi
                " - ",
                { $arrayElemAt: ["$package.name", 0] }, // Lấy giá trị đầu tiên từ 'package.name'
              ],
            },
          },
        },
        {
          $project: {
            title: 1, // Exclude original 'name'
            start: 1, // Exclude original 'appointmentDate'
            end: 1,
            namePackage: 1,
          },
        },
      ]);

      // const formatAppointments = totalAppointments.map((item) => ({
      //   ...item,
      //   start: moment(item.start).toDate(),
      //   end: moment(item.end).toDate(),
      // }));

      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: {
          totalAppointments: totalAppointments,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReportCountRecordsSpa = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCount = await User.countDocuments();
      const packageCount = await Package.countDocuments();
      const appointmentCount = await Appointment.countDocuments();
      // const totalRevenue = await Order.aggregate([
      //   {
      //     $group: {
      //       _id: null,
      //       total: { $sum: "$totalPrice" },
      //     },
      //   },
      // ]);
      const totalRevenue = await Appointment.aggregate([
        {
          $match: {
            status: "Completed", // Lọc các đơn hàng có trạng thái Completed
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalPrice" },
          },
        },
      ]);

      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: {
          user: userCount,
          revenue: totalRevenue?.[0]?.total ?? 0,
          package: packageCount,
          appointment: appointmentCount,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReportCountUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const userStatistics = await User.aggregate([
        {
          $group: {
            _id: "$userType",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            userType: "$_id",
            count: 1,
          },
        },
      ]);

      const totalUser = await User.countDocuments();

      // Organize statistics by userType
      const result = {};
      userStatistics.forEach((stat) => {
        result[stat.userType] = stat.count;
      });

      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: { data: result, total: totalUser },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReportTotalRevenue = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentDate = new Date();
      const lastYearDate = new Date();
      lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

      const revenueByMonth = await Appointment.aggregate([
        // {
        //   $match: {
        //     createdAt: { $gte: lastYearDate, $lte: currentDate },
        //   },
        // },
        {
          $match: {
            status: "Completed",
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$appointmentDate" },
              year: { $year: "$appointmentDate" },
            },
            total: { $sum: "$totalPrice" },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            total: 1,
          },
        },
        {
          $sort: { year: 1, month: 1 },
        },
      ]);

      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: revenueByMonth,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReportCountOrderStatus = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderStatistics = await Appointment.aggregate([
        {
          $group: {
            _id: "$status",
            total: { $sum: 1 },
          },
        },
      ]);

      const orderCount = await Appointment.countDocuments();

      const statisticsByStatus = {};
      orderStatistics.forEach((stat) => {
        statisticsByStatus[stat._id] = stat.total;
      });

      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: {
          data: statisticsByStatus,
          total: orderCount,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReportCountProductStatus = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const productStatistics = await Product.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);
      const totalCount = await Product.countDocuments();

      // Tổ chức thống kê theo status
      const result = {};
      productStatistics.forEach((stat) => {
        result[stat._id] = stat.count;
      });

      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: {
          data: result,
          total: totalCount,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getReportCountProductType,
  getReportCountRecords,
  getReportCountUser,
  getReportTotalRevenue,
  getReportCountOrderStatus,
  getReportCountProductStatus,
  getReportCountRecordsSpa,

  // show ra calendar
  getAllAppointments,
};
