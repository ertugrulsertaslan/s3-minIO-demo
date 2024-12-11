import express from "express";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const s3 = new S3Client({
  endpoint: "http://localhost:9000", // MinIO's endpoint address (MinIO in docker runs on this port)
  region: "us-east-1", // Region (this doesn't really matter, in MinA this is usually 'us-east-1')
  credentials: {
    accessKeyId: "YOUR_ACCESS_KEY", // MinIO access key
    secretAccessKey: "YOUR_SECRET_KEY", // MinIO secret key
  },
  forcePathStyle: true, // To be MinIO compatible
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/signed-url", async (req, res) => {
  const { fileName, contentType } = req.query;

  if (!fileName || !contentType) {
    return res.status(400).send("fileName and contentType are required");
  }

  const params = {
    Bucket: "YOUR_BUCKET_NAME",
    Key: fileName,
    ContentType: contentType,
  };

  try {
    const commandGet = new GetObjectCommand(params);
    const signedUrlGet = await getSignedUrl(s3, commandGet, { expiresIn: 300 }); // Valid for 5 minutes

    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // Valid for 5 minutes
    res.json({ signedUrl, signedUrlGet });
  } catch (error) {
    console.error("Error generating signed URL:", error.message);
    res.status(500).send("Failed to generate signed URL");
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
