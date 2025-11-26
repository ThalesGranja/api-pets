import { Request, Response } from 'express';
import User from '../models/IUser';

export const UserController = {
  create: async (req: Request, res: Response) => {
    res.json('Olá Get a Pet');
  }
}