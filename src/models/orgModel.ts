import { Schema, model, type InferSchemaType } from 'mongoose';
import { addressSchema } from './addressModel';

const orgSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Org = model('org', orgSchema);

export type OrgDocument = InferSchemaType<typeof orgSchema>;
