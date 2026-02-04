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

// Rota teste
app.get("/", (req, res) => {
  res.json({ status: "API Kanban rodando 🚀" });
});

app.use("/tasks", taskRoutes);

// ❗ Garantia de variável de ambiente
if (!process.env.MONGO_URL) {
  throw new Error("❌ MONGO_URL não definida");
}

// 🔗 Conecta no Mongo e só depois sobe o servidor
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB conectado");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no MongoDB:", err.message);
    process.exit(1);
  });
