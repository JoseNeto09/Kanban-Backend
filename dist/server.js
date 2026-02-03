"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// 🚨 Fly injeta a porta automaticamente
const PORT = Number(process.env.PORT) || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ status: "API Kanban rodando 🚀" });
});
app.use("/tasks", task_routes_1.default);
// ❗ Garantia de variável
if (!process.env.MONGO_URL) {
    throw new Error("❌ MONGO_URL não definida");
}
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB conectado"))
    .catch(console.error);
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
