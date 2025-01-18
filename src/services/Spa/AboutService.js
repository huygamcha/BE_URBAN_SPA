const { CONFIG_MESSAGE_ERRORS } = require("@configs");
const About = require("@models/Spa/AboutModel");

const updateAbout = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAbout = await About.findOne({
        _id: id,
      });

      if (!checkAbout) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The About is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      const updatedAbout = await About.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Updated About type success",
        typeError: "",
        data: updatedAbout,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailAbout = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAbout = await About.findOne({
        _id: id,
      });
      if (checkAbout === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The about is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        data: checkAbout,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  updateAbout,
  getDetailAbout,
};
