import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../services/authService';
import Users from '../models/User';
import bcrypt from 'bcrypt';

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.body;
		const user = await Users.findById(id);

		if (!user) {
			res.status(404).json({ message: 'Пользователь не найден.' });
			return;
		}

		res.status(200).json({ name: user.name, lastname: user.lastname, email: user.email });
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.body;

		const user = await Users.findById(id);
		if (!user) {
			res.status(404).json({ message: 'Пользователь не найден.' });
			return;
		}

		await Users.findByIdAndDelete(id);
		res.status(200).json({ message: 'Пользователь успешно удален.' });
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, name, lastname, email, password, role, favorites } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const updateData = { name, lastname, email, password: hashedPassword, role, favorites };

		const updatedUser = await Users.findByIdAndUpdate(id, updateData, {
			new: true,
			runValidators: true,
		})
			.exec();

		if (!updatedUser) {
			res.status(404).json({ message: 'Пользователь не найден' });
			return;
		}

		res.status(200).json({ message: 'Пользователь успешно обновлен.', updatedUser });
	} catch (error) {
		next(error);
	}
};

export const registerStudent = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, lastname, email, password } = req.body;

		const existingUser = await Users.findOne({ email });
		if (existingUser) {
			res.status(400).json({ message: 'Пользователь уже зарегистрирован.' });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newStudent = new Users({
			name,
			lastname,
			email,
			password: hashedPassword,
			role: 'student',
		});
		await newStudent.save();

		const token = generateToken(newStudent._id);

		res.status(201).json({
			message: 'Регистрация успешна.',
			token: token,
		});
	} catch (error) {
		next(error);
	}
};

export const registerTeacher = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, lastname, email, password } = req.body;

		const existingUser = await Users.findOne({ email });
		if (existingUser) {
			res.status(400).json({ message: 'Пользователь уже зарегистрирован.' });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newStudent = new Users({
			name,
			lastname,
			email,
			password: hashedPassword,
			role: 'teacher',
		});
		await newStudent.save();

		const token = generateToken(newStudent._id);

		res.status(201).json({
			message: 'Регистрация успешна.',
			token: token,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const user = await Users.findOne({ email });

		if (!user) {
			res.status(400).json({ message: 'Данные введены неверно.' });
			return;
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			res.status(400).json({ message: 'Данные введены неверно.' });
			return;
		}

		const token = generateToken(user._id);

		res.status(200).json({ token });
	} catch (error) {
		next(error);
	}
};
