const { CONFIG_MESSAGE_ERRORS } = require("@configs");
const { validateRequiredInput } = require("@utils");
const AboutService = require("../../services/Spa/AboutService");

const updateAbout = async (req, res) => {
  try {
    const aboutId = req.params.id;
    if (!aboutId) {
      return res.status(CONFIG_MESSAGE_ERRORS.INVALID.status).json({
        status: "Error",
        typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
        message: `The field aboutId is required`,
      });
    }
    const response = await AboutService.updateAbout(aboutId, req.body);
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

const getDetailAbout = async (req, res) => {
  try {
    const aboutId = req.params.id;
    if (!aboutId) {
      return res.status(CONFIG_MESSAGE_ERRORS.INVALID.status).json({
        status: "Error",
        typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
        message: `The field aboutId is required`,
      });
    }
    const response = await AboutService.getDetailAbout(aboutId);
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
  updateAbout,
  getDetailAbout,
};
