"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express_1.default.json());
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', port });
});
app.get('/api/config', (_req, res) => {
    res.json({
        apiBaseUrl: baseUrl,
        mongoHostPort: 27017,
    });
});
app.listen(port, () => {
    console.log(`Octofit backend running on port ${port}`);
});
void mongoose_1.default.connect(mongoUri, { dbName: 'octofit_db' }).then(() => {
    console.log('Connected to MongoDB octofit_db');
}).catch((error) => {
    console.error('MongoDB connection failed (server still running):', error);
});
