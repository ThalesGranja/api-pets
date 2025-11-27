import mongoose from 'mongoose';
import 'dotenv/config';

async function main() {
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;

  await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apigetapet.tgnsqzy.mongodb.net/?appName=APIGetAPet`);
  console.log('Conectou ao Mongoose!');
}

main().catch((err) => console.log(err));

export default mongoose;