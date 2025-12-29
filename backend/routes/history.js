import express from "express";
import { db } from "../firebase/init.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "User ID required" });
        }

        const snapshot = await db.collection('translations')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();

        const history = [];
        snapshot.forEach(doc => {
            history.push({ id: doc.id, ...doc.data() });
        });

        res.json(history);
    } catch (error) {
        console.error("History fetch error:", error);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

export default router;
