const { CONFIG_MESSAGE_ERRORS } = require("../configs");
const Appointment = require("../models/AppointmentModel");

const createAppointment = (newAppointment) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, packageId, appointmentDate, phoneNumber } =
      newAppointment;
    try {
      const checkAppointment = await Appointment.findOne({
        name: name,
      });
      if (checkAppointment !== null) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.status,
          message: "The name of appointment is existed",
          typeError: CONFIG_MESSAGE_ERRORS.ALREADY_EXIST.type,
          data: null,
          statusMessage: "Error",
        });
      }
      const createAppointment = await Appointment.create({
        name,
        email,
        packageId,
        appointmentDate,
        phoneNumber,
      });
      if (createAppointment) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
          message: "Created appointment success",
          typeError: "",
          data: createAppointment,
          statusMessage: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateAppointment = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAppointment = await Appointment.findOne({ _id: id });

      if (!checkAppointment) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "Appointment not found",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      const updatedAppointment = await Appointment.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Appointment updated successfully",
        typeError: "",
        data: updatedAppointment,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteAppointment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAppointment = await Appointment.findOne({ _id: id });

      if (!checkAppointment) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "Appointment not found",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      await Appointment.findByIdAndDelete(id);
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Appointment deleted successfully",
        typeError: "",
        data: checkAppointment,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsAppointment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const appointment = await Appointment.findOne({ _id: id }).populate(
        "packageId"
      );

      if (!appointment) {
        resolve({
          status: CONFIG_MESSAGE_ERRORS.INVALID.status,
          message: "Appointment not found",
          typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
          data: null,
          statusMessage: "Error",
        });
        return;
      }

      resolve({
        status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
        message: "Appointment details fetched successfully",
        typeError: "",
        data: appointment,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllAppointments = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = params?.limit ? +params.limit : 10;
      const search = params?.search ?? "";
      const page = params?.page ? +params.page : 1;
      const order = params?.order ?? "createdAt desc";
      const query = {};

      if (search) {
        const searchRegex = { $regex: search, $options: "i" };
        query.$or = [
          { customerName: searchRegex },
          { customerEmail: searchRegex },
        ];
      }

      const fieldsToSelect = {
        name: 1,
        email: 1,
        packageId: 1,
        appointmentDate: 1,
        phoneNumber: 1,
        totalPrice: 1,
        note: 1,
        status: 1,
      };
      const totalCount = await Appointment.countDocuments(query);
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

      if (page === -1 && limit === -1) {
        const allAppointment = await Appointment.find(query)
          .sort(sortOptions)
          .select(fieldsToSelect);
        resolve({
          status: CONFIG_MESSAGE_ERRORS.GET_SUCCESS.status,
          message: "Success",
          typeError: "",
          statusMessage: "Success",
          data: {
            appointments: allAppointment,
            totalPage: 1,
            totalCount: totalCount,
          },
        });
        return;
      }

      const allAppointment = await Appointment.find(query)
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
          appointments: allAppointment,
          totalPage: totalPage,
          totalCount: totalCount,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyAppointments = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Appointment.deleteMany({ _id: ids });
      resolve({
        status: CONFIG_MESSAGE_ERRORS.ACTION_SUCCESS.status,
        message: "Delete appointments success",
        typeError: "",
        data: null,
        statusMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getDetailsAppointment,
  getAllAppointments,
  deleteManyAppointments,
};
