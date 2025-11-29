import { InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      required: true,
      select: false,
    },
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model('User', userSchema);

export type UserDocument = InferSchemaType<typeof userSchema>;
