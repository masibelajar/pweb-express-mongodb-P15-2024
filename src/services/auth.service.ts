import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

export class AuthService {
    // Fungsi untuk mendaftarkan pengguna baru
    async register(username: string, password: string): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        return await newUser.save();
    }

    // Fungsi untuk login pengguna
    async login(username: string, password: string): Promise<string | null> {
        const user = await User.findOne({ username });
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        return token;
    }

    // Fungsi untuk memverifikasi token JWT
    verifyToken(token: string): string | object | null {
        try {
            return jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            return null;
        }
    }
}

export default new AuthService();
