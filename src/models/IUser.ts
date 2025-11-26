import mongoose from '../db/conn';
const Schema = mongoose.Schema;

const User = mongoose.model(
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