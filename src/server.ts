// config inicial
import express, { Request, Response } from "express";
import UserRoutes from "./routes/UserRoutes";
import PetRoutes from "./routes/PetRoutes";
import 'dotenv/config';

const app = express();

// config json response
app.use(express.json());

// routes
app.use('/users', UserRoutes);
app.use('/pets', PetRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});