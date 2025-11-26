// config inicial
import express, { Request, Response } from 'express';

const app = express();

// config json response
app.use(express.json());

// routes

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});