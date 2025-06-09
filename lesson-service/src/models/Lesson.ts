import { Schema, model } from 'mongoose';

interface ILesson {
	_id: string;
	title: string;
	content: string;
	videoUrl: string;
	course: Schema.Types.ObjectId;
	order: number;
	createdAt: number;
}

const LessonSchema: Schema = new Schema<ILesson>({
	title: { type: String, required: true },
	content: { type: String, required: false },
	videoUrl: { type: String, required: false },
	course: { type: Schema.Types.ObjectId, required: true },
	order: { type: Number, required: false },
	createdAt: { type: Number, required: true, default: Date.now },
});

const Lesson = model<ILesson>('Lessons', LessonSchema);

export default Lesson;
export { ILesson };
