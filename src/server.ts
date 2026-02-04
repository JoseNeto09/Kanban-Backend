import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();

// 🚨 Fly injeta a porta automaticamente
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "API Kanban rodando 🚀" });
});

app.use("/tasks", taskRoutes);

// ❗ Garantia de variável
if (!process.env.MONGO_URL) {
  throw new Error("❌ MONGO_URL não definida");
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(console.error);


