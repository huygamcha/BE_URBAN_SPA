const express = require("express");
const router = express.Router();
const { CONFIG_PERMISSIONS } = require("@configs");
const { AuthPermission } = require("@middleware/AuthPermission");
const UploadImageController = require("../../controllers/Spa/UploadImageController");
const multer = require("multer");

// app.post("/upload", upload.single("file"), async (req, res) => {
//   const S3 = new S3Client({
//     region: "auto",
//     endpoint: process.env.ENDPOINT,
//     credentials: {
//       accessKeyId: process.env.R2_ACCESS_KEY_ID,
//       secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
//     },
//   });
//   // const fileKey = req.file.originalname
//   const webpFileBuffer = await sharp(req.file.buffer)
//     .webp({ quality: 75 })
//     .toBuffer();
//   const fileInfo = await fromBuffer(webpFileBuffer);
//   const { name } = path.parse(req.file.originalname);
//   await S3.send(
//     new PutObjectCommand({
//       Body: webpFileBuffer,
//       Bucket: "min",
//       Key: `${name}.${fileInfo.ext}`,
//       ContentType: fileInfo.mime,
//       ACL: "public-read", // Cho phép truy cập công khai
//     })
//   );
//   // URL của tệp đã tải lên
//   const fileUrl = `https://pub-50bb58cfabdd4b93abb4e154d0eada9e.r2.dev/${name}.webp`;
//   res.send(`${fileUrl}`);
// });
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

router.post(
  "/",
  // AuthPermission(CONFIG_PERMISSIONS.ADMIN),
  upload.single("file"),
  UploadImageController.uploadImage
);

module.exports = router;
