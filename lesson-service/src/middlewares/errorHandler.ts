import { Request, Response } from 'express';

export const errorHandler = (error: string, req: Request, res: Response) => {
	console.error(error);
	res.status(500).json({ error: error });
};
