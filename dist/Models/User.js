"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/User.ts
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
