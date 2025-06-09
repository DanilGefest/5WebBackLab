import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('authToken');

	if (!token) {
		res.status(401).json({ message: 'Доступ отклонен. Нет токена доступа.' });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key') as {
			userId: string;
		};

		req.body.id = decoded.userId;

		next();
	} catch {
		res.status(400).json({ message: 'Неверный токен.' });
	}
};
