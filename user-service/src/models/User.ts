import { Schema, model, Model } from 'mongoose';

interface IUser {
	_id: string;
	name: string;
	lastname: string;
	email: string;
	password: string;
	role: string;
	favorites: Schema.Types.ObjectId[];
}

interface IUserMethods {
	comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema: Schema = new Schema<IUser, UserModel, IUserMethods>({
	name: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
	favorites: [{ type: Schema.Types.ObjectId, default: [] }],
});

const Users = model<IUser, UserModel>('Users', userSchema);

export default Users;
export { IUser };
