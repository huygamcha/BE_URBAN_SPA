const { CONFIG_MESSAGE_ERRORS } = require("@configs");
const Package = require("@models/Spa/PackageModel");

const createPackage = (newPackage) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      nameKo,
      nameEn,
      nameJp,
      description,
      descriptionKo,
      descriptionEn,
      descriptionJp,
      image,
      slug,
    } = newPackage;

    try {
      const checkPackage = await Package.findOne({
        name: name,
      });
      if (checkPackage !== null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
          message: "The name of Package is existed",
          typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
          data: null,
          statusMessage: "Error",
        });
      }
      const createPackage = await Package.create({
        name,
        nameKo,
        nameEn,
        nameJp,
        description,
        descriptionKo,
        descriptionEn,
        descriptionJp,
        image,
        slug,
      });
      if (createPackage) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
          message: "Created Package success",
          typeError: "",
          data: createPackage,
          statusMessage: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updatePackage = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPackage = await Package.findOne({
        _id: id,
      });

      if (!checkPackage) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The Package is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      if (data.name && data.name !== checkPackage.name) {
        const existedName = await Package.findOne({
          name: data.name,
          _id: { $ne: id },
        });

        if (existedName !== null) {
          resolve({
            status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
            message: "The name of Package is existed",
            typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
            data: null,
            statusMessage: "Error",
          });
          return;
        }
      }

      const updatedPackage = await Package.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Updated Package type success",
        typeError: "",
        data: updatedPackage,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deletePackage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPackage = await Package.findOne({
        _id: id,
      });
      if (checkPackage === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The Package name is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }

      await Package.findByIdAndDelete(id);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Deleted Package success",
        typeError: "",
        data: checkPackage,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyCities = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Package.deleteMany({ _id: ids });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Delete packages success",
        typeError: "",
        data: null,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsPackage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fieldsToSelect = {
        name: 1,
        nameKo: 1,
        nameEn: 1,
        nameJp: 1,
        description: 1,
        descriptionKo: 1,
        descriptionEn: 1,
        descriptionJp: 1,
        image: 1,
        slug: 1,
        services: 1,
      };
      const checkPackage = await Package.findOne({
        _id: id,
      });

      // const checkPackage = await Package.aggregate([
      //   {
      //     $match: { _id: id },
      //   },
      //   {
      //     $lookup: {
      //       from: "services",
      //       localField: "_id",
      //       foreignField: "packageId",
      //       as: "services",
      //     },
      //   },
      // ]);
      if (checkPackage === null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "The Package is not existed",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
      }
      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Success",
        typeError: "",
        data: checkPackage,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllPackage = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = params?.limit ? +params?.limit : 10;
      const search = params?.search ?? "";
      const page = params?.page ? +params.page : 1;
      const order = params?.order ?? "createdAt desc";
      const query = {};
      if (search) {
        const searchRegex = { $regex: search, $options: "i" };

        query.$or = [
          { slug: searchRegex },
          { name: searchRegex },
          { nameKo: searchRegex },
          { nameJp: searchRegex },
          { nameEn: searchRegex },
        ];
      }

      const totalCount = await Package.countDocuments(query);

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
        nameEn: 1,
        nameJp: 1,
        description: 1,
        descriptionKo: 1,
        descriptionEn: 1,
        descriptionJp: 1,
        image: 1,
        slug: 1,
        services: 1,
      };

      if (page === -1 && limit === -1) {
        // const allPackage = await Package.find(query)
        //   .sort(sortOptions)
        //   .select(fieldsToSelect);
        const allPackage = await Package.aggregate([
          { $match: query },
          {
            $lookup: {
              from: "services",
              localField: "_id",
              foreignField: "packageId",
              as: "services",
            },
          },
          { $project: fieldsToSelect },
        ]);

        resolve({
          status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
          message: "Success",
          typeError: "",
          statusMessage: "Success",
          data: {
            packages: allPackage,
            totalPage: 1,
            totalCount: totalCount,
          },
        });
        return;
      }

      const allPackage = await Package.find(query)
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
          packages: allPackage,
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
  createPackage,
  updatePackage,
  getDetailsPackage,
  deletePackage,
  getAllPackage,
  deleteManyCities,
};
