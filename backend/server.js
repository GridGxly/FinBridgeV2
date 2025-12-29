import "dotenv/config";
console.log("Loading environment variables...");
console.log("PLAID_CLIENT_ID present:", !!process.env.PLAID_CLIENT_ID);
console.log("PLAID_SECRET present:", !!process.env.PLAID_SECRET);
console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);
import express from "express";
import cors from "cors";
import adviceRoutes from "./routes/advice.js";
import userRoutes from "./routes/user.js";
import transactionRoutes from "./routes/transactions.js";
import translateRoutes from "./routes/translate.js";
import plaidRoutes from "./routes/plaid.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/advice", adviceRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api/plaid", plaidRoutes);

app.get("/", (req, res) => {
    res.send("FinBridge backend is running.");
})

// Export app for Vercel
export default app;

// Only listen if not running in Vercel/Serverless environment
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}