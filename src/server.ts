// config inicial
import express, { Request, Response } from "express";
import UserRoutes from "./routes/UserRoutes";

const app = express();

// config json response
app.use(express.json());

// routes
app.use('/users', UserRoutes)
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});