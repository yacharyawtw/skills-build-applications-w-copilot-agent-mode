"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    focusAreas: [{ type: String }],
    suggestedDurationMinutes: { type: Number, default: 30, min: 5 },
    difficulty: { type: String, default: 'medium' },
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
