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
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model('User', userSchema);

export type UserDocument = InferSchemaType<typeof userSchema>;
