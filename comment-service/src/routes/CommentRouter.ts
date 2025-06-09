import express from 'express';
import {
	createComment,
	getComments,
	updateComment,
	deleteComment,
} from '../controllers/CommentController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getComments);
router.post('/', authenticateToken, createComment);
router.delete('/:id', authenticateToken, deleteComment);
router.put('/:id', authenticateToken, updateComment);

export default router;