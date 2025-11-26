import { Router } from "express";
import { UserController } from "../controllers/UserController";
const router = Router();

// rotas
router.post('/register', UserController.create);


export default router;