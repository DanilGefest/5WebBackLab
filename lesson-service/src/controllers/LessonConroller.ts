import { Request, Response, NextFunction } from 'express';
import Lesson from '../models/Lesson';

export const createLesson = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { title, content, videoUrl, course, order } = req.body;

		const lesson = new Lesson({
			title,
			content,
			videoUrl,
			course,
			order,
		});
		await lesson.save();

		res.status(201).json({ message: 'Урок создан', lesson });
	} catch (error) {
		next(error);
	}
};

export const getLessons = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const lessonList = await Lesson.find().populate('course');

		res.status(200).json({ lessonList });
	} catch (error) {
		next(error);
	}
};

export const getLessonById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const lesson = await Lesson.findById(id);

		if (!lesson) {
			res.status(404).json({ message: 'Урок не найден' });
		}
		res.status(200).json(lesson);
	} catch (error) {
		next(error);
	}
};

export const updateLesson = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		const lesson = await Lesson.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!lesson) {
			res.status(404).json({ message: 'Урок не найден' });
			return;
		}

		res.status(200).json({ message: 'Урок обновлен', lesson });
	} catch (error) {
		next(error);
	}
};

export const deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		const lesson = await Lesson.findById(id);

		if (!lesson) {
			res.status(404).json({ message: 'Урок не найден' });
			return;
		}

		await Lesson.findByIdAndDelete(id);
		res.status(200).json({ message: 'Урок успешно удален' });
	} catch (error) {
		next(error);
	}
};
