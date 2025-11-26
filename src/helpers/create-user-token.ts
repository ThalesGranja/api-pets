import jwb from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../models/IUser'

const createUserToken = async (user: IUser, req: Request, res: Response) => {
  // create token
  const token = jwb.sign({
    name: user.name,
    id: user._id
  }, "nossosecret")

  //return token
  res.status(200).json({ message: "Você está autenticado", token: token, userId: user._id })
}

export default createUserToken;