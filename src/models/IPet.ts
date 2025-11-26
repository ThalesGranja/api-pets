import mongoose from '../db/conn';
const Schema = mongoose.Schema;

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