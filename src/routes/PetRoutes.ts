import { Router } from 'express';
import { PetController } from '../controllers/PetController';
const router = Router();

// middleware
import verifyToken from '../helpers/verify-token'

// rotas
router.post('/create', PetController.create);



export default router;