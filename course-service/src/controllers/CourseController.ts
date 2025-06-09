import { Request, Response, NextFunction } from 'express';
import { FilterQuery, SortOrder } from 'mongoose';
import Course, { ICourse } from '../models/Course';
import slugify from 'slugify';
import deleteFile from '../services/deleteFile';

const buildFilterQuery = (search: string): FilterQuery<ICourse> => {
	const filter: FilterQuery<ICourse> = {};
	if (search) {
		filter.title = { $regex: search, $options: 'i' };
	}
	return filter;
};

const handlePagination = (page: number, limit: number) => {
	const pageNumber = page || 1;
	const limitNumber = limit || 10;
	const skip = (pageNumber - 1) * limitNumber;

	return { pageNumber, limitNumber, skip };
};

const handleSorting = (sort: string, order: string) => {
	const sortOrder = order === 'asc' ? 1 : -1;
	return { [sort as string]: sortOrder as SortOrder };
};

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', search } = req.query;

		const filter = buildFilterQuery(search as string);

		const { pageNumber, limitNumber, skip } = handlePagination(page as number, limit as number);

		const sortOptions = handleSorting(sort as string, order as string);

		const courses = await Course.find(filter)
			.sort(sortOptions)
			.skip(skip)
			.limit(limitNumber)
			.exec();

		const totalCourses = await Course.countDocuments(filter);
		const totalPages = Math.ceil(totalCourses / limitNumber);

		res.status(200).json({
			courses,
			page: pageNumber,
			limit: limitNumber,
			totalPages,
			totalCourses,
		});
	} catch (error) {
		next(error);
	}
};

export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ message: 'Отсутствует ID курса' });
			return;
		}
		const course = await Course.findById(id).exec();
		if (!course) {
			res.status(404).json({ message: 'Курс не найден' });
			return;
		}
		res.status(200).json(course);
	} catch (error) {
		next(error);
	}
};

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { title, description, price, category, level, published, author, tags, filename } = req.body;

		if (!filename) {
			res.status(400).json({ message: 'Изображение не найдено.' });
			return;
		}

		const newCourse = new Course({
			title,
			slug: slugify(title),
			description,
			price,
			image: filename,
			category,
			level,
			published,
			author,
			createdAt: new Date(),
			tags,
		});

		const savedCourse = await newCourse.save();
		res.status(201).json(savedCourse);
	} catch (error) {
		if(req.body.filename){
			await deleteFile('uploads/' + req.body.filename);
		}
		next(error);
	}
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { title, description, price, category, level, published, author, tags } = req.body;
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ message: 'Отсутствует ID курса' });
			return;
		}

		if (!req.body.filename) {
			res.status(400).json({ message: 'Изображение не найдено.' });
			return;
		}

		const updateData = {
			title,
			description,
			price,
			category,
			level,
			published,
			author,
			tags,
			image: req.body.filename,
		};

		const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
			new: true,
			runValidators: true,
		})
			.exec();

		if (!updatedCourse) {
			res.status(404).json({ message: 'Курс не найден' });
			return;
		}

		res.status(200).json({ message: 'Курс успешно обновлен.', updatedCourse });
	} catch (error) {
		await deleteFile('uploads/' + req.body.filename);
		next(error);
	}
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ message: 'Отсутствует ID курса' });
			return;
		}

		const deletedCourse = await Course.findByIdAndDelete(id);

		if (!deletedCourse) {
			res.status(404).json({ message: 'Курс не найден' });
			return;
		}

		res.status(204).send({ message: 'Курс удален.' });
	} catch (error) {
		next(error);
	}
};
