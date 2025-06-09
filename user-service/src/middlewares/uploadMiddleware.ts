import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';

const UPLOAD_PATH = 'uploads/';

import fs from 'fs';
if (!fs.existsSync(UPLOAD_PATH)) {
	fs.mkdirSync(UPLOAD_PATH);
}

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	if (file.mimetype.startsWith('image/')) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

export const uploadImage = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: fileFilter,
}).single('image');

export const processImage = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.file) {
		return next();
	}

	try {
		const filename = uuidv4() + '.jpg';
		const imagePath = path.join(UPLOAD_PATH, filename);

		await sharp(req.file.buffer)
			.resize({ width: 800, height: 600, fit: 'inside' })
			.composite([
				{
					input: 'watermark.jpg',
					gravity: 'southwest',
					blend: 'over',
				},
			])
			.jpeg({ quality: 80 })
			.toFile(imagePath);

		req.body.filename = filename;
		next();
	} catch (error) {
		next(error);
		return;
	}
};
