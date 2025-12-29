import express from "express";
import { getChatResponse } from "../services/openAIService.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { message, history, language, context } = req.body;

        const messages = history ? history.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
        })) : [];

        messages.push({ role: 'user', content: message });

        const reply = await getChatResponse(messages, language, context);

        res.json({ reply });
    }
    catch (error) {
        console.error("Chat route error:", error);
        res.status(500).json({
            error: "Error generating response",
            details: error.message,
            stack: error.stack
        });
    }
});

export default router;