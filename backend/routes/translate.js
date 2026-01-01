import express from "express";
import multer from "multer";
import { translateDocument } from "../services/geminiService.js";
import { db } from "../firebase/init.js";


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
            console.log('File processing skipped for demo');
        }


        const result = await translateDocument({
            text,
            fileBuffer,
            mimeType,
            targetLanguage: targetLanguage || "English"
        });


        if (userId && userId !== 'undefined') {
            try {
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
            } catch (dbError) {
                console.warn("Firestore Write Failed (Non-fatal):", dbError.message);
            }
        }

        res.json(result);
    } catch (error) {
        console.error("Translation route error:", error);
        res.status(500).json({ error: "Translation failed" });
    }
});

export default router;
