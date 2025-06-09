import { Request, Response, NextFunction } from 'express';
import Users from '../models/User';

export default function checkRole(role: string) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const user = await Users.findById(req.body.id);

		if (!user) {
			res.status(404).json({ message: 'Пользователь не найден' });
			return;
		}

		if (role == user.role) {
			next();
		} else {
			res.status(403).json({ message: 'Отказано, несоответствующая роль.' });
		}
	};
}
