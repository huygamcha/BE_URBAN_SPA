const { CONFIG_MESSAGE_ERRORS } = require("@configs");
const ReportService = require("../services/ReportService");

const getAllAppointments = async (req, res) => {
  try {
    const { start, end } = req.query;
    const response = await ReportService.getAllAppointments({ start, end });
    const { data, status, typeError, message, statusMessage } = response;

    return res.status(status).json({
      typeError,
      data,
      message,
      status: statusMessage,
    });
  } catch (e) {
    console.log("««««« e »»»»»", e);
    return res.status(CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.status).json({
      message: "Internal Server Error",
      data: null,
      status: "Error",
      typeError: CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.type,
    });
  }
};

const getReportCountRecordsSpa = async (req, res) => {
  try {
    const response = await ReportService.getReportCountRecordsSpa();
    const { data, status, typeError, message, statusMessage } = response;
    return res.status(status).json({
      typeError,
      data,
      message,
      status: statusMessage,
    });
  } catch (e) {
    return res.status(CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.status).json({
      message: "Internal Server Error",
      data: null,
      status: "Error",
      typeError: CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.type,
    });
  }
};

const getReportCountUser = async (req, res) => {
  try {
    const response = await ReportService.getReportCountUser();
    const { data, status, typeError, message, statusMessage } = response;
    return res.status(status).json({
      typeError,
      data,
      message,
      status: statusMessage,
    });
  } catch (e) {
    return res.status(CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.status).json({
      message: "Internal Server Error",
      data: null,
      status: "Error",
      typeError: CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.type,
    });
  }
};

const getReportTotalRevenue = async (req, res) => {
  try {
    const response = await ReportService.getReportTotalRevenue();
    const { data, status, typeError, message, statusMessage } = response;
    return res.status(status).json({
      typeError,
      data,
      message,
      status: statusMessage,
    });
  } catch (e) {
    return res.status(CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.status).json({
      message: "Internal Server Error",
      data: null,
      status: "Error",
      typeError: CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.type,
    });
  }
};

const getReportCountOrderStatus = async (req, res) => {
  try {
    const response = await ReportService.getReportCountOrderStatus();
    const { data, status, typeError, message, statusMessage } = response;
    return res.status(status).json({
      typeError,
      data,
      message,
      status: statusMessage,
    });
  } catch (e) {
    return res.status(CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.status).json({
      message: "Internal Server Error",
      data: null,
      status: "Error",
      typeError: CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.type,
    });
  }
};

module.exports = {
  getReportCountUser,
  getReportTotalRevenue,
  getReportCountOrderStatus,
  getReportCountRecordsSpa,

  // show ra calendar
  getAllAppointments,
};
