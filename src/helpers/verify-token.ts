import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import getToken from './get-token';

// middleware to validade token
const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso negado!' });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' });
  }

  try {
    const verified = jwt.verify(token, 'nossosecret');
    //req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido!' });
  }

}

export default checkToken;