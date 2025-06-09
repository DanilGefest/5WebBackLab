import express from 'express';
import { createTag, getAllTags, updateTag, deleteTag } from '../controllers/TagController';
import { authenticateToken } from '../middlewares/authMiddleware';
import checkRole from '../middlewares/checkRole';

const router = express.Router();

router.post('/', authenticateToken, checkRole('teacher'), createTag);
router.get('/', getAllTags);
router.put('/:id', authenticateToken, checkRole('teacher'), updateTag);
router.delete('/:id', authenticateToken, checkRole('teacher'), deleteTag);

export default router;
