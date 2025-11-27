import mongoose from '../db/conn';
import { Document } from 'mongoose';

const Schema = mongoose.Schema;

// interface
export interface IPet extends Document {
  name: string;
  age: number;
  weight: number;
  color: string;
  available: boolean;
  user: object;
  adopter: object;
}

const Pet = mongoose.model(
  'Pet',
  new Schema(
    {
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      weight: {
        type: Number,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      available: {
        type: Boolean,
      },
      user: Object,
      adopter: Object
    },
    { timestamps: true },
  ),
);

export default Pet;