import mongoose from '../db/conn';
import { Document } from 'mongoose';

const Schema = mongoose.Schema;

// interface
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone: string;
}

const User = mongoose.model<IUser>(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
    },
    { timestamps: true },
  ),
);

export default User;