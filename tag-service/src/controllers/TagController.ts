import { Request, Response, NextFunction } from 'express';
import Tag from '../models/Tags';
import slugify from 'slugify';

export const createTag = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.body;
		const newTag = new Tag({ name, slug: slugify(name) });
		const savedTag = await newTag.save();
		res.status(201).json(savedTag);
	} catch (error) {
		next(error);
	}
};

export const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tags = await Tag.find();
		res.status(200).json(tags);
	} catch (error) {
		next(error);
	}
};

export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		if (!id) {
			res.status(400).json({ message: 'Отсутствует ID тега' });
			return;
		}

		const updateData = {name, slug: slugify(name)}
		
		const updatedTag = await Tag.findByIdAndUpdate(id, updateData, {
			new: true,
			runValidators: true,
		});
		if (!updatedTag) {
			res.status(404).json({ message: 'Тег не найден' });
			return;
		}
		res.status(200).json(updatedTag);
	} catch (error) {
		next(error);
	}
};

export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ message: 'Неверный ID тега' });
			return;
		}
		const deletedTag = await Tag.findByIdAndDelete(id);
		if (!deletedTag) {
			res.status(404).json({ message: 'Тег не найден' });
			return;
		}
		res.status(204).send('Тег удален');
	} catch (error) {
		next(error);
	}
};
