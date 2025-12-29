import "dotenv/config";

import express from "express";
import cors from "cors";
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

app.use(cors());

app.use(express.json());
app.use("/api/advice", adviceRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/plaid", plaidRoutes);
app.use("/api/graphs", graphRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
    res.send("FinBridge backend is running.");
})

export default app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}