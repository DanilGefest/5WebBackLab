import express from 'express';
import {
	deleteUser,
	updateUser,
	getUserInfo,
	registerStudent,
	registerTeacher,
	login,
} from '../controllers/UserController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', login);
router.get('/info', authenticateToken, getUserInfo);
router.post('/register/student', registerStudent);
router.post('/register/teacher', registerTeacher);
router.delete('/', authenticateToken, deleteUser);
router.put('/', authenticateToken, updateUser);

export default router;
