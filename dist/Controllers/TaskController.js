"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.listTasks = listTasks;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const Task_1 = __importDefault(require("../Models/Task"));
/* =========================
   CREATE TASK
========================= */
async function createTask(req, res) {
    const { title, description, status } = req.body;
    if (typeof title !== "string" ||
        typeof description !== "string" ||
        typeof status !== "string") {
        return res.status(400).json({ error: "Dados inválidos" });
    }
    const task = await Task_1.default.create({
        title,
        description,
        status,
    });
    return res.status(201).json(task);
}
/* =========================
   LIST TASKS
========================= */
async function listTasks(req, res) {
    const tasks = await Task_1.default.find().sort({ createdAt: -1 });
    return res.json(tasks);
}
/* =========================
   UPDATE TASK
========================= */
async function updateTask(req, res) {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task_1.default.findByIdAndUpdate(id, { title, description, status }, { new: true });
    if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    return res.json(task);
}
/* =========================
   DELETE TASK
========================= */
async function deleteTask(req, res) {
    const { id } = req.params;
    const task = await Task_1.default.findByIdAndDelete(id);
    if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    return res.status(204).send();
}
