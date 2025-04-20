const { CONFIG_MESSAGE_ERRORS } = require("../../configs");
const Blog = require("../../models/Spa/BlogModel");

const createBlog = (newBlog) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, nameEn, nameJp, nameKo } = newBlog;

      // Check tồn tại bất kỳ bản ghi trùng nào
      const existed = await Blog.findOne({
        $or: [{ name }, { nameEn }, { nameJp }, { nameKo }],
      });

      if (existed) {
        return resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The field must be unique",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      const data = await Blog.create(newBlog);

      if (createBlog) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
          message: "Created blog success",
          typeError: "",
          data: data,
          statusMessage: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateBlog = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBlog = await Blog.findOne({
        _id: id,
      });
      if (!checkBlog) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The blog is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      // tạo thêm trường vưa được cập nhật vào (language  )
      const updateBlog = { ...checkBlog.toObject() };
      for (const key in data) {
        updateBlog[key] = data[key];
      }
      const result = await Blog.findByIdAndUpdate(id, updateBlog, {
        new: true,
      });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Updated blog type success",
        typeError: "",
        data: result,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBlog = await Blog.findOne({
        _id: id,
      });
      if (checkBlog === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The blog name is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }

      await Blog.findByIdAndDelete(id);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Deleted blog success",
        typeError: "",
        data: checkBlog,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyBlogs = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Blog.deleteMany({ _id: ids });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Delete blogs success",
        typeError: "",
        data: null,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBlog = await Blog.findOne({
        _id: id,
      });
      if (checkBlog === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The blog is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        data: checkBlog,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getBlogBySlug = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBlog = await Blog.findOne({
        slug,
      });
      if (checkBlog === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The blog is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        data: checkBlog,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllBlog = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = params?.limit ? +params?.limit : 10;
      const search = params?.search ?? "";
      const page = params?.page ? +params.page : 1;
      const order = params?.order ?? "createdAt desc";
      const query = {};
      if (search) {
        const searchRegex = { $regex: search, $options: "i" };

        query.$or = [{ name: searchRegex }, { slug: searchRegex }];
      }

      const totalCount = await Blog.countDocuments(query);

      const totalPage = Math.ceil(totalCount / limit);

      const startIndex = (page - 1) * limit;

      let sortOptions = {};
      if (order) {
        const orderFields = order
          .split(",")
          .map((field) => field.trim().split(" "));
        orderFields.forEach(([name, direction]) => {
          sortOptions[name] = direction.toLowerCase() === "asc" ? 1 : -1;
        });
      }

      const fieldsToSelect = {
        name: 1,
        nameEn: 1,
        nameJp: 1,
        nameKo: 1,
        description: 1,
        descriptionEn: 1,
        descriptionJp: 1,
        descriptionKo: 1,
        slug: 1,
        thumbnail: 1,
        createdAt: 1,
      };
      if (page === -1 && limit === -1) {
        const allBlog = await Blog.find(query)
          .sort(sortOptions)
          .select(fieldsToSelect);
        resolve({
          status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
          message: "Success",
          typeError: "",
          statusMessage: "Success",
          data: {
            blogs: allBlog,
            totalPage: 1,
            totalCount: totalCount,
          },
        });
        return;
      }

      const allBlog = await Blog.find(query)
        .skip(startIndex)
        .limit(limit)
        .sort(sortOptions)
        .select(fieldsToSelect);

      console.log("««««« allBlog »»»»»", allBlog);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: {
          blogs: allBlog,
          totalPage: totalPage,
          totalCount: totalCount,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getRandomBlog = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const number = +params?.number || 5;
      const currentSlug = params?.currentSlug || "";
      const data = await Blog.aggregate([
        { $match: { slug: { $ne: currentSlug } } },
        {
          $sample: { size: number },
        },
      ]);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: data,
      });
    } catch (error) {
      console.log("««««« error »»»»»", error);
      reject(error);
    }
  });
};

module.exports = {
  createBlog,
  updateBlog,
  getDetailsBlog,
  deleteBlog,
  getAllBlog,
  deleteManyBlogs,
  getBlogBySlug,
  getRandomBlog,
};
