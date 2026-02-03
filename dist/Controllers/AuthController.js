"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const User_1 = __importDefault(require("../Models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* =========================
   REGISTER
========================= */
async function register(req, res) {
    const { name, email, password } = req.body;
    // ✅ Validação de tipos (TypeScript-friendly)
    if (typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string") {
        return res.status(400).json({ error: "Dados inválidos" });
    }
    // 🔒 Verifica se usuário já existe
    const userExists = await User_1.default.findOne({ email });
    if (userExists) {
        return res.status(409).json({ error: "Usuário já cadastrado" });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 8);
    const user = await User_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    // ❌ Nunca retorne a senha (nem hash)
    return res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
    });
}
/* =========================
   LOGIN
========================= */
async function login(req, res) {
    const { email, password } = req.body;
    // ✅ Validação de tipos
    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ error: "Email e senha obrigatórios" });
    }
    const user = await User_1.default.findOne({ email });
    if (!user || typeof user.password !== "string") {
        return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }
    const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: "JWT_SECRET não configurado" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
}
