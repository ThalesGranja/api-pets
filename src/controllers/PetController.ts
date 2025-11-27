import { Request, response, Response } from 'express';
import bcrypt from 'bcrypt';
import Pet from '../models/IPet';
import jwt from 'jsonwebtoken';

// helpers
import createUserToken from '../helpers/create-user-token';
import getToken from '../helpers/get-token';
import getUserByToken from '../helpers/get-user-by-token';

export const PetController = {
  create: async (req: Request, res: Response) => {
    res.json({ message: 'Deu certo!' })
  }
}