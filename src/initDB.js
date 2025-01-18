const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/UserModel");
const Role = require("./models/RoleModel");
const About = require("./models/Spa/AboutModel");
const bcrypt = require("bcrypt");
const { CONFIG_PERMISSIONS } = require("./configs");

const initializeDB = async () => {
  try {
    // Kết nối đến cơ sở dữ liệu
    await mongoose
      .connect(`${process.env.MONGO_DB}urbanSpa?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        const defaultAbout = new About({
          name: "",
          nameJp: "",
          nameKo: "",
          nameEn: "",
        });
        await defaultAbout.save();
        // const defaultAdminRole = new Role({
        //   name: "Admin",
        //   permissions: [CONFIG_PERMISSIONS.ADMIN],
        // });

        // const defaultBasicRole = new Role({
        //   name: "Basic",
        //   permissions: [CONFIG_PERMISSIONS.BASIC],
        // });

        // await defaultAdminRole.save();
        // await defaultBasicRole.save();
        // console.log('««««« 33 »»»»»', 33);
        // const hash = bcrypt.hashSync("1234Kha@", 10);
        // const roleAdmin = await Role.findOne({ name: "Admin" });
        // if (roleAdmin) {
        //   const defaultUser = new User({
        //     email: "admin@gmail.com",
        //     password: hash,
        //     role: roleAdmin,
        //   });
        //   await defaultUser.save();
        // }
      })
      .then(() => {
        mongoose.connection.close();
      })
      .catch((e) => {
        console.log("Error init data", e);
      });
  } catch (error) {
    console.log("Error init data", error);
  }
};

dotenv.config();
initializeDB();
