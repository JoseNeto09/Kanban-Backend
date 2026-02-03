"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// import authRoutes from "./routes/auth.routes";
const task_routes_1 = __importDefault(require("./routes/task.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Porta usada localmente antes
// const PORT = process.env.PORT || 3333;
// Porta correta para Fly.io (produção)
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rota teste
app.get("/", (req, res) => {
    res.json({ status: "API Kanban rodando 🚀" });
});
// 🔗 CONECTANDO AS ROTAS AQUI
// app.use("/auth", authRoutes);
app.use("/tasks", task_routes_1.default);
// MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB conectado"))
    .catch(console.error);
// Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
