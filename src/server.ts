import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();

// Porta usada localmente antes
// const PORT = process.env.PORT || 3333;

// Porta correta para Fly.io (produção)
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Rota teste
app.get("/", (req, res) => {
  res.json({ status: "API Kanban rodando 🚀" });
});

// 🔗 CONECTANDO AS ROTAS AQUI
// app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(console.error);

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
