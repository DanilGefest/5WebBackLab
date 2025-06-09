import { Schema, model } from 'mongoose';

interface ITag {
	_id: string;
	name: string;
	slug: string;
}

const tagSchema = new Schema<ITag>({
	name: { type: String, required: true, unique: true },
	slug: { type: String, required: true, unique: true },
});

const Tag = model<ITag>('Tags', tagSchema);

export default Tag;
export { ITag };
