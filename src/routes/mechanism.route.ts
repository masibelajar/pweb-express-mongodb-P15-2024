import { Router } from 'express';
import { updateBookStatus, getBooksByStatus } from '../controllers/mechanism.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Rute untuk mengubah status buku berdasarkan ID
router.patch('/:bookId/status', authenticateToken, updateBookStatus);

// Rute untuk mendapatkan daftar buku berdasarkan status
router.get('/status', authenticateToken, getBooksByStatus);

export default router;
