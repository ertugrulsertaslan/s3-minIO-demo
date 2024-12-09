import express from "express";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const s3 = new S3Client({
  endpoint: "http://localhost:9000", // MinIO's endpoint address (MinIO in docker runs on this port)
  region: "us-east-1", // Region (this doesn't really matter, in MinA this is usually 'us-east-1')
  credentials: {
    accessKeyId: "YOUR-ACCESS-KEY", //  MinIO access key
    secretAccessKey: "YOUR-SECRET-KEY", //  MinIO secret key
  },
  forcePathStyle: true, // To be MinIO compatible
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Choose File Please");
  }

  const params = {
    Bucket: "YOUR_BUCKET_NAME", // MinIO bucket name
    Key: req.file.originalname, // Name of the file to upload
    Body: req.file.buffer, // File content to upload
    ContentType: req.file.mimetype, // MIME type of the file
  };

  try {
    // Upload the file to MiniIO
    const command = new PutObjectCommand(params);
    await s3.send(command);
    res.status(200).send("File uploaded successfully");
  } catch (err) {
    console.error("Failed to load file:", err);
    return res.status(500).send("Failed to load file:");
  }
});

app.get("/signed-url", async (req, res) => {
  const params = {
    Bucket: "YOUR_BUCKET_NAME",
    Key: req.query.file, // The name of the file you want to get the URL for
  };

  //Get signed URL from MinIO
  try {
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // URL valid for 5 minutes
    res.json({ url: url }); // We return the signed URL
  } catch (err) {
    console.error("Failed to create signed URL:", err);
    return res.status(500).send("Failed to create signed URL");
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
