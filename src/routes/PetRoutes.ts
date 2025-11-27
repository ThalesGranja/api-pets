import { Router } from 'express';
import { PetController } from '../controllers/PetController';
const router = Router();

// middleware
import verifyToken from '../helpers/verify-token'

// rotas
router.post('/create', verifyToken, PetController.create);
router.get('/', PetController.getAll);
router.get('/mypets', verifyToken, PetController.getAllUserPets);
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions);
router.get('/:id', PetController.getPetById);
router.delete('/:id', verifyToken, PetController.removePetById);
router.patch('/:id', verifyToken, PetController.updatePet);
router.patch('/schedule/:id', verifyToken, PetController.schedule);


export default router;