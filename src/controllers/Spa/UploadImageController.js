const { CONFIG_MESSAGE_ERRORS } = require("@root/configs");
const { UploadImageService } = require("../../services/Spa/UploadImageService");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "Error",
        message: "File is required",
      });
    }

    // const response = await UploadImageService.uploadImage(req.file);
    const response = await UploadImageService.uploadImage(req.file);

    return res.status(200).json({
      status: "Success",
      data: response,
    });
  } catch (e) {
    console.log("««««« e »»»»»", e);
    return res.status(500).json({
      status: "Error",
      message: CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.message,
    });
  }
};

module.exports = {
  uploadImage,
};
