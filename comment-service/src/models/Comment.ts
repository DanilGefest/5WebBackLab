import { Schema, model } from 'mongoose';

interface IComment {
	_id: string;
	user: Schema.Types.ObjectId;
	lesson: Schema.Types.ObjectId;
	text: string;
}

const LessonSchema: Schema = new Schema<IComment>({
	user: { type: Schema.Types.ObjectId, required: true },
	lesson: { type: Schema.Types.ObjectId, required: true },
	text: { type: String, required: true, maxlength: 255 },
});

const Comment = model<IComment>('Comments', LessonSchema);

export default Comment;
export { IComment };
