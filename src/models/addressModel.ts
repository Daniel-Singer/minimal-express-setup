import { Schema, model, type InferSchemaType } from 'mongoose';

export const addressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Address = model('address', addressSchema);

export type AddressDocument = InferSchemaType<typeof addressSchema>;
