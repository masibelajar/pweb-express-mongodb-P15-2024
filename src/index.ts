import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db-connection';
import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
