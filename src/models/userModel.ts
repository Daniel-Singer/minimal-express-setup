import { InferSchemaType, Model, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { TUser } from '../schema/userSchema';

interface UserMethods {
  comparePasswords(providedPassword: string): Promise<boolean>;
}

interface UserModel extends Model<TUser, {}, UserMethods> {}

type TUserSchema = Omit<TUser, 'orgId'> & {
  orgId: Schema.Types.ObjectId;
};

const userSchema = new Schema<TUserSchema, UserModel, UserMethods>(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.method('comparePasswords', async function (providedPassword) {
  return await bcrypt.compare(providedPassword, this?.password!);
});

export const User = model('User', userSchema);

export type UserDocument = InferSchemaType<typeof userSchema>;
