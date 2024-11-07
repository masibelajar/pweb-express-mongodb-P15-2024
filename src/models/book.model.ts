import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    description: string;
}

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
});

export default mongoose.model<IBook>('Book', bookSchema);
