import { Router } from "express";
import { UserController } from "../controllers/UserController";
const router = Router();

// rotas
router.post('/register', UserController.register);
router.post('/login', UserController.login);


export default router;