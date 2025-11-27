import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/IUser';

interface TokenPayload extends JwtPayload {
  id: string;
}

// get user by jwt token
const getUserByToken = async (token: string) => {
  const decoded = jwt.verify(token, 'nossosecret') as TokenPayload;

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
}

export default getUserByToken;