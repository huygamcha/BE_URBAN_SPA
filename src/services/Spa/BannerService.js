const { CONFIG_MESSAGE_ERRORS } = require("../../configs");
const Banner = require("../../models/Spa/BannerModel");

const createBanner = (newBanner) => {
  return new Promise(async (resolve, reject) => {
    const { links } = newBanner;
    try {
      const all = links.map(
        async (item) =>
          await Banner.create({
            link: item,
          })
      );

      const data = await Promise.all(all);

      if (createBanner) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
          message: "Created banner success",
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

const updateBanner = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBanner = await Banner.findOne({
        _id: id,
      });
      if (!checkBanner) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The banner is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      // tạo thêm trường vưa được cập nhật vào (language  )
      const updateBanner = { ...checkBanner.toObject() };
      for (const key in data) {
        updateBanner[key] = data[key];
      }
      const result = await Banner.findByIdAndUpdate(id, updateBanner, {
        new: true,
      });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Updated banner type success",
        typeError: "",
        data: result,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteBanner = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBanner = await Banner.findOne({
        _id: id,
      });
      if (checkBanner === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The banner name is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }

      await Banner.findByIdAndDelete(id);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Deleted banner success",
        typeError: "",
        data: checkBanner,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyBanners = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Banner.deleteMany({ _id: ids });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Delete banners success",
        typeError: "",
        data: null,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsBanner = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBanner = await Banner.findOne({
        _id: id,
      });
      if (checkBanner === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The banner is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        data: checkBanner,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllBanner = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = params?.limit ? +params?.limit : 10;
      const search = params?.search ?? "";
      const page = params?.page ? +params.page : 1;
      const order = params?.order ?? "createdAt desc";
      const query = {};
      if (search) {
        const searchRegex = { $regex: search, $options: "i" };

        query.$or = [{ name: searchRegex }];
      }

      const totalCount = await Banner.countDocuments(query);

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
        link: 1,
      };
      if (page === -1 && limit === -1) {
        const allBanner = await Banner.find(query)
          .sort(sortOptions)
          .select(fieldsToSelect);
        resolve({
          status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
          message: "Success",
          typeError: "",
          statusMessage: "Success",
          data: {
            banners: allBanner,
            totalPage: 1,
            totalCount: totalCount,
          },
        });
        return;
      }

      const allBanner = await Banner.find(query)
        .skip(startIndex)
        .limit(limit)
        .sort(sortOptions)
        .select(fieldsToSelect);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: {
          banners: allBanner,
          totalPage: totalPage,
          totalCount: totalCount,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createBanner,
  updateBanner,
  getDetailsBanner,
  deleteBanner,
  getAllBanner,
  deleteManyBanners,
};
