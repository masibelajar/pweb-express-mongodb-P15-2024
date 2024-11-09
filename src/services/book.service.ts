import Book, { IBook } from '../models/book.model';

export class BookService {
    // Fungsi untuk mendapatkan semua buku
    async getAllBooks(): Promise<IBook[]> {
        return await Book.find();
    }

    // Fungsi untuk mendapatkan buku berdasarkan ID
    async getBookById(bookId: string): Promise<IBook | null> {
        return await Book.findById(bookId);
    }

    // Fungsi untuk membuat buku baru
    async createBook(data: Partial<IBook>): Promise<IBook> {
        const newBook = new Book(data);
        return await newBook.save();
    }

    // Fungsi untuk memperbarui buku berdasarkan ID
    async updateBook(bookId: string, data: Partial<IBook>): Promise<IBook | null> {
        return await Book.findByIdAndUpdate(bookId, data, { new: true });
    }

    // Fungsi untuk menghapus buku berdasarkan ID
    async deleteBook(bookId: string): Promise<IBook | null> {
        return await Book.findByIdAndDelete(bookId);
    }
}

export default new BookService();
