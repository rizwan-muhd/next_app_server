import express from 'express';
import { register, getAllUser, login } from '../controllers/user'; // Ensure this path is correct
import { auth } from '../middleWare/auth'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/get-user',auth, getAllUser);
export default router;
