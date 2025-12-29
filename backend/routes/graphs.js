import express from "express";
import { getGraphData } from "../services/geminiService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { type } = req.query;
        const graphData = await getGraphData({ type: type || "spending", context: "Monthly spending breakdown" });

        if (!graphData) {
            return res.status(500).json({ error: "Failed to generate graph data" });
        }

        res.json(graphData);
    } catch (error) {
        console.error("Graph route error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
