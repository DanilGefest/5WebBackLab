import { Request, Response, NextFunction } from 'express';
import Comment, { IComment } from '../models/Comment';
import { FilterQuery } from 'mongoose';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, lesson, text } = req.body;

		const comment = new Comment({
			user: id,
			lesson,
			text,
		});
		await comment.save();

		res.status(201).json({ message: 'Комментарий создан', comment: comment });
	} catch (error) {
		next(error);
	}
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { lesson } = req.body;

		const filter: FilterQuery<IComment> = {};

		if (lesson) {
			filter.lesson = lesson;
		}

		const commentsList = await Comment.find(filter);
		res.json({ commentsList });
	} catch (error) {
		next(error);
	}
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		const comment = await Comment.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!comment) {
			res.status(404).json({ message: 'Комментарий не найден' });
			return;
		}

		res.status(200).json({ comment });
	} catch (error) {
		next(error);
	}
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;

		const comment = await Comment.findById(id);

		if (!comment) {
			res.status(404).json({ message: 'Комментарий не найден' });
			return;
		}

		await Comment.findByIdAndDelete(id);
		res.status(200).json({ message: 'Комментарий удален', comment });
	} catch (error) {
		next(error);
	}
};
