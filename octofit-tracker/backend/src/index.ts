import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

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

void mongoose.connect(mongoUri, { dbName: 'octofit_db' }).then(() => {
  console.log('Connected to MongoDB octofit_db');
}).catch((error) => {
  console.error('MongoDB connection failed (server still running):', error);
});
