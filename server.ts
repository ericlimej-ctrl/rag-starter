import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import busArrivalHandler from './api/bus-arrival.js';
import healthHandler from './apihealth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.all('/api/bus-arrival', (req, res) => {
  return busArrivalHandler(req, res);
});

app.all('/apihealth', (req, res) => {
  return healthHandler(req, res);
});

app.all('/apihealth.js', (req, res) => {
  return healthHandler(req, res);
});

app.all('/api/health', (req, res) => {
  return healthHandler(req, res);
});

// Vite or Static Asset Serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: Number(PORT), host: '0.0.0.0' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
