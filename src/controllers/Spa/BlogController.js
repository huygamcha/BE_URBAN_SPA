const { CONFIG_MESSAGE_ERRORS } = require("../../configs");
const { validateRequiredInput } = require("../../utils");
const BlogService = require("../../services/Spa/BlogService");

const createBlog = async (req, res) => {
  try {
    const requiredFields = validateRequiredInput(req.body, [
      "name",
      "nameEn",
      "nameJp",
      "nameKo",
      "description",
      "descriptionEn",
      "descriptionJp",
      "descriptionKo",
      "slug",
      "thumbnail",
    ]);
    if (requiredFields?.length) {
      return res.status(CONFIG_MESSAGE_ERRORS.INVALID.status).json({
        status: "Error",
        typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
        message: `The field ${requiredFields.join(", ")} is required`,
        data: null,
      });
    }
    const response = await BlogService.createBlog(req.body);
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

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(CONFIG_MESSAGE_ERRORS.INVALID.status).json({
        status: "Error",
        typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
        message: `The field blogId is required`,
      });
    }
    const response = await BlogService.updateBlog(blogId, req.body);
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

const getDetailsBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(CONFIG_MESSAGE_ERRORS.INVALID.status).json({
        status: "Error",
        typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
        message: `The field blogId is required`,
      });
    }
    const response = await BlogService.getDetailsBlog(blogId);
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

const getBlogBySlug = async (req, res) => {
  try {
    const slug = req.params.id;
    if (!slug) {
      return res.status(CONFIG_MESSAGE_ERRORS.INVALID.status).json({
        status: "Error",
        typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
        message: `The field blogId is required`,
      });
    }
    const response = await BlogService.getBlogBySlug(slug);
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

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(CONFIG_MESSAGE_ERRORS.INVALID.status).json({
        status: "Error",
        typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
        message: `The field blogId is required`,
      });
    }
    const response = await BlogService.deleteBlog(blogId);
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

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.blogIds;
    if (!ids || !ids.length) {
      return res.status(CONFIG_MESSAGE_ERRORS.INVALID.status).json({
        status: "Error",
        typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
        message: `The field blogIds is required`,
      });
    }
    const response = await BlogService.deleteManyBlogs(ids);
    const { data, status, typeError, message, statusMessage } = response;
    return res.status(status).json({
      typeError,
      data,
      message,
      status: statusMessage,
    });
  } catch (e) {
    return res.status(200).json({
      message: "Internal Server Error",
      data: null,
      status: "Error",
      typeError: CONFIG_MESSAGE_ERRORS.INTERNAL_ERROR.type,
    });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const params = req.query;
    const response = await BlogService.getAllBlog(params);
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
  createBlog,
  updateBlog,
  getDetailsBlog,
  deleteBlog,
  getAllBlog,
  deleteMany,
  getBlogBySlug,
};
