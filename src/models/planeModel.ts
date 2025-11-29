import { Schema, model, type InferSchemaType } from 'mongoose';

const planeSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      default: null,
    },
    manufacturer: {
      type: String,
      default: null,
    },
    registration: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);

export const Plane = model('planeSchema', planeSchema);

export type PlaneSchemaDocument = InferSchemaType<typeof planeSchema>;
