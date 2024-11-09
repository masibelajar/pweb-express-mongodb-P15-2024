import Book, { IBook } from '../models/book.model';

export class MechanismService {
    // Contoh metode untuk mengubah status buku
    async updateBookStatus(bookId: string, status: string): Promise<IBook | null> {
        try {
            const book = await Book.findByIdAndUpdate(
                bookId,
                { status: status },
                { new: true }
            );
            return book;
        } catch (error) {
            throw new Error('Failed to update book status');
        }
    }

    // Metode untuk mendapatkan daftar buku berdasarkan status tertentu
    async getBooksByStatus(status: string): Promise<IBook[]> {
        try {
            const books = await Book.find({ status: status });
            return books;
        } catch (error) {
            throw new Error('Failed to fetch books by status');
        }
    }
}

export default new MechanismService();
