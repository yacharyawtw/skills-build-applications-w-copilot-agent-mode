"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    owner: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
