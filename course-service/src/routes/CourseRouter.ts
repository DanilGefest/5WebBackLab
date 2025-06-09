import express from 'express';
import {
	getAllCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
} from '../controllers/CourseController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { uploadImage, processImage } from '../middlewares/uploadMiddleware';
import checkRole from '../middlewares/checkRole';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', authenticateToken, checkRole('teacher'), uploadImage, processImage, createCourse);
router.put(
	'/:id',
	authenticateToken,
	checkRole('teacher'),
	uploadImage,
	processImage,
	updateCourse,
);
router.delete('/:id', authenticateToken, checkRole('teacher'), deleteCourse);

export default router;
