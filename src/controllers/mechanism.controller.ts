import { Request, Response } from 'express';
import mechanismService from '../services/mechanism.service';

export const updateBookStatus = async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const { status } = req.body;

    try {
        const updatedBook = await mechanismService.updateBookStatus(bookId, status);
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBooksByStatus = async (req: Request, res: Response) => {
    const { status } = req.query;

    try {
        const books = await mechanismService.getBooksByStatus(status as string);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
