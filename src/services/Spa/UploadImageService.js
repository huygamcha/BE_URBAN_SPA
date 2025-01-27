const sharp = require("sharp");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fileType = require("file-type");
const path = require("path");

const UploadImageService = {
  uploadImage: async (file) => {
    const S3 = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });

    const webpFileBuffer = await sharp(file.buffer)
      .webp({ quality: 75 })
      .toBuffer();
    const fileInfo = await fileType.fromBuffer(webpFileBuffer);
    const { name } = path.parse(file.originalname);

    const fileKey = `${name}.${fileInfo.ext}`;
    const bucketName = "kampa";

    await S3.send(
      new PutObjectCommand({
        Body: webpFileBuffer,
        Bucket: bucketName,
        Key: fileKey,
        ContentType: fileInfo.mime,
        ACL: "public-read",
      })
    );

    const fileUrl = `https://${process.env.R2_URL}/${fileKey}`;

    return fileUrl;
  },
};

module.exports = {
  UploadImageService,
};
