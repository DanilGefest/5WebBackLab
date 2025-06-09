import { Schema, model } from 'mongoose';

interface ICourse {
	_id: string;
	title: string;
	slug: string;
	description?: string;
	price: number;
	image: string;
	category: string;
	level: string;
	published: boolean;
	author: string;
	createdAt: number;
	tags: Schema.Types.ObjectId[];
}

const courseSchema = new Schema<ICourse>({
	title: { type: String, required: true },
	slug: { type: String, required: true, unique: true },
	description: { type: String, required: false },
	price: { type: Number, required: true },
	image: { type: String, required: true },
	category: { type: String, required: true },
	level: { type: String, required: true, default: 'beginner' },
	published: { type: Boolean, required: true, default: false },
	author: { type: String, required: true },
	createdAt: { type: Number, required: true, default: Date.now },
	tags: [{ type: Schema.Types.ObjectId }],
});

const Course = model<ICourse>('Courses', courseSchema);

export default Course;
export { ICourse };
