import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import adviceRoutes from "./routes/advice.js";
import transactionRoutes from "./routes/transactions.js";
import plaidRoutes from "./routes/plaid.js";
import graphRoutes from "./routes/graphs.js";
import translateRoutes from "./routes/translate.js";
import historyRoutes from "./routes/history.js";

console.log("Graph Routes imported:", graphRoutes);

const app = express();

console.log("--- DEBUG: SERVER STARTUP ---");
console.log("OPENAI_API_KEY Loaded:", process.env.OPENAI_API_KEY ? "YES (" + process.env.OPENAI_API_KEY.substring(0, 4) + "...)" : "NO");
console.log("---------------------------");


app.use(helmet());

// rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);


const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/advice", adviceRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/plaid", plaidRoutes);
app.use("/api/graphs", graphRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
    res.send("FinBridge backend is running.");
});


app.get("/api/health", (req, res) => {
    res.json({ ok: true, status: "healthy" });
});

export default app;


const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});