const { CONFIG_MESSAGE_ERRORS } = require("@configs");
const Service = require("@models/Spa/ServiceModel");

const createService = (newService) => {
  return new Promise(async (resolve, reject) => {
    const { name, nameKo, nameJp, nameEn, packageId, options } = newService;
    try {
      const checkService = await Service.findOne({
        name: name,
      });
      if (checkService !== null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
          message: "The name of service is existed",
          typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
          data: null,
          statusMessage: "Error",
        });
      }
      const createService = await Service.create({
        name,
        nameKo,
        nameJp,
        nameEn,
        packageId,
        options,
      });
      if (createService) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
          message: "Created service success",
          typeError: "",
          data: createService,
          statusMessage: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkService = await Service.findOne({
        _id: id,
      });

      if (!checkService) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The service is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      if (data.name && data.name !== checkService.name) {
        const existedName = await Service.findOne({
          name: data.name,
          _id: { $ne: id },
        });

        if (existedName !== null) {
          resolve({
            status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
            message: "The name of service is existed",
            typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
            data: null,
            statusMessage: "Error",
          });
          return;
        }
      }

      const updatedService = await Service.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Updated service type success",
        typeError: "",
        data: updatedService,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkService = await Service.findOne({
        _id: id,
      });
      if (checkService === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The service name is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }

      await Service.findByIdAndDelete(id);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Deleted service success",
        typeError: "",
        data: checkService,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyServices = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Service.deleteMany({ _id: ids });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Delete services success",
        typeError: "",
        data: null,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkService = await Service.findOne({
        _id: id,
      });
      if (checkService === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The service is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        data: checkService,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllService = (params) => {
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

      const totalCount = await Service.countDocuments(query);

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
        nameKo: 1,
        nameJp: 1,
        nameKr: 1,
        nameEn: 1,
        packageId: 1,
        options: 1,
      };

      if (page === -1 && limit === -1) {
        const allService = await Service.find(query)
          .sort(sortOptions)
          .select(fieldsToSelect);
        resolve({
          status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
          message: "Success",
          typeError: "",
          statusMessage: "Success",
          data: {
            services: allService,
            totalPage: 1,
            totalCount: totalCount,
          },
        });
        return;
      }

      const allService = await Service.find(query)
        .skip(startIndex)
        .limit(limit)
        .populate({
          path: "packageId",
          select: "name",
          as: "package",
        })
        .sort(sortOptions)
        .select(fieldsToSelect);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        statusMessage: "Success",
        data: {
          services: allService,
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
  createService,
  updateService,
  getDetailService,
  deleteService,
  getAllService,
  deleteManyServices,
};
