import mongoose from 'mongoose';
import 'dotenv/config';

async function main() {
  const MONGO_URI = process.env.MONGO_URI

  await mongoose.connect(`${MONGO_URI}`);
  console.log('Conectou ao Mongoose!');
}

main().catch((err) => console.log(err));

export default mongoose;