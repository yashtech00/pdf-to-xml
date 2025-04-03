import nextConnect from "";
import upload from "@/lib/multer";
import pdfParse from "pdf-parse";
import { toXML } from "to-xml";
import { PrismaClient } from "@prisma/client";
import aws from "aws-sdk";
import dotenv from "dotenv"
import axios from "axios";

dotenv.config();
const prisma = new PrismaClient();

const s3 = new aws.S3();

const handler = nextConnect();

// Middleware for file upload
handler.use(upload.single("file"));

handler.post(async (req, res) => {
  try {
    const fileUrl = req.file.location;

    // Download the file from S3
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });

    // Extract text from PDF
    const pdfData = await pdfParse(response.data);
    const extractedText = pdfData.text;

    // Convert extracted text to JSON
    const jsonData = { text: extractedText };

    // Convert JSON to XML
    const xmlData = toXML(jsonData);

    // Upload XML file to S3
    const fileName = `converted_${Date.now()}`;
    const xmlParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `xml/${fileName}.xml`,
      Body: xmlData,
      ContentType: "application/xml",
      ACL: "public-read",
    };
    const xmlUpload = await s3.upload(xmlParams).promise();
    const xmlUrl = xmlUpload.Location;

    // Store data in PostgreSQL
    const storedData = await prisma.pdfData.create({
      data: {
        pdfUrl: fileUrl,
        jsonData: jsonData,
        xmlUrl: xmlUrl,
      },
    });

    res.status(200).json({
      message: "File uploaded and processed successfully",
      json: jsonData,
      xml: xmlData,
      xmlUrl: xmlUrl,
      dbEntry: storedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing file" });
  }
});

export default handler;
