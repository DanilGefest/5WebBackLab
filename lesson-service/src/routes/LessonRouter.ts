import express from 'express';
import {
	createLesson,
	getLessons,
	getLessonById,
	updateLesson,
	deleteLesson,
} from '../controllers/LessonConroller';
import { authenticateToken } from '../middlewares/authMiddleware';
import checkRole from '../middlewares/checkRole';

const router = express.Router();

router.post('/', authenticateToken, checkRole('teacher'), createLesson);
router.get('/', getLessons);
router.get('/:id', getLessonById);
router.put('/:id', authenticateToken, checkRole('teacher'), updateLesson);
router.delete('/:id', authenticateToken, checkRole('teacher'), deleteLesson);

export default router;
