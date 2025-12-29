import express from "express";
import multer from "multer";
import { translateDocument } from "../services/geminiService.js";
import { bucket, db } from "../firebase/init.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single('file'), async (req, res) => {
    try {
        const { text, targetLanguage, userId } = req.body;
        const file = req.file;

        if (!text && !file) {
            return res.status(400).json({ error: "No text or file provided" });
        }

        let fileUrl = null;
        let mimeType = null;
        let fileBuffer = null;


        if (file) {
            mimeType = file.mimetype;
            fileBuffer = file.buffer;

            const fileName = `uploads/${userId || 'guest'}/${uuidv4()}_${file.originalname}`;
            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            await new Promise((resolve, reject) => {
                blobStream.on('error', reject);
                blobStream.on('finish', resolve);
                blobStream.end(file.buffer);
            });


            const [url] = await blob.getSignedUrl({
                action: 'read',
                expires: '03-01-2500'
            });
            fileUrl = url;
            console.log("File uploaded to:", fileUrl);
        }


        const result = await translateDocument({
            text,
            fileBuffer,
            mimeType,
            targetLanguage: targetLanguage || "English"
        });


        if (userId && userId !== 'undefined') {
            await db.collection('translations').add({
                userId,
                originalText: text ? text.substring(0, 200) + "..." : "[File]",
                fileUrl: fileUrl,
                fileName: file ? file.originalname : null,
                targetLanguage: targetLanguage || "English",
                summary: result.summary,
                translatedTextFragments: result.translatedText?.substring(0, 200),
                confidence: result.confidence,
                createdAt: new Date()
            });
        }

        res.json(result);
    } catch (error) {
        console.error("Translation route error:", error);
        res.status(500).json({ error: "Translation failed" });
    }
});

export default router;
