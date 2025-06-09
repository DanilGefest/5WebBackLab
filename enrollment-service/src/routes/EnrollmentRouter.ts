import express from 'express';
import {
	createEnrollment,
	completeLesson,
	uncompleteLesson,
	enrollmentProgress,
	enrollmentUsers,
} from '../controllers/EnrollmentController';
import { authenticateToken } from '../middlewares/authMiddleware';
import checkRole from '../middlewares/checkRole';

const enrollmentRoute = express.Router();

enrollmentRoute.post('/', authenticateToken, checkRole('student'), createEnrollment);
enrollmentRoute.post('/complete/:enrollementId/:lessonId', authenticateToken, completeLesson);
enrollmentRoute.post('/uncomplete/:enrollementId/:lessonId', authenticateToken, uncompleteLesson);
enrollmentRoute.get('/:enrollementId', enrollmentProgress);
enrollmentRoute.get('/users/:courseId', authenticateToken, enrollmentUsers);

export default enrollmentRoute;
