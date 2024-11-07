import { Router } from 'express';
import { getAllBooks, createBook } from '../controllers/book.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAllBooks);
router.post('/', authenticateToken, createBook);

export default router;
