import { Router } from 'express';
import { UserController } from '../controllers/UserController';
const router = Router();

// middleware
import verifyToken from '../helpers/verify-token'

// rotas
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.patch('/edit/:id', verifyToken, UserController.editUser);
router.delete('/delete/:id', verifyToken, UserController.deleteUser);


export default router;