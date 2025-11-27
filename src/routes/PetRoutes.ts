import { Router } from 'express';
import { PetController } from '../controllers/PetController';
const router = Router();

// middleware
import verifyToken from '../helpers/verify-token'

// rotas
router.post('/create', verifyToken, PetController.create);
router.get('/', PetController.getAll);



export default router;