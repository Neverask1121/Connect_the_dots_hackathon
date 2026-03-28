const express = require("express");
const multer = require("multer");
const Minio = require("minio");

const app = express();
const upload = multer({ dest: "uploads/" });

const minioClient = new Minio.Client({
  endPoint: "minio",
  port: 9000,
  useSSL: false,
  accessKey: "admin",
  secretKey: "password",
});

app.post("/api/upload-file", upload.single("file"), async (req, res) => {
  const file = req.file;

  await minioClient.fPutObject("files", file.filename, file.path);
  res.json({ file: file.filename });
});

app.get("/api/get-file", async (req, res) => {
  const file = req.query.name;
  const stream = await minioClient.getObject("files", file);
  stream.pipe(res);
});

app.listen(3002, () => console.log("File service running"));

const bucket = "files";

minioClient.bucketExists(bucket, function (err, exists) {
  if (err) return console.log(err);
  if (!exists) {
    minioClient.makeBucket(bucket, "us-east-1", function (err) {
      if (err) console.log(err);
      else console.log("Bucket created");
    });
  }
});