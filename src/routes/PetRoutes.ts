import { Router } from 'express';
import { PetController } from '../controllers/PetController';
const router = Router();

// middleware
import verifyToken from '../helpers/verify-token'

// rotas
router.post('/create', verifyToken, PetController.create);



export default router;