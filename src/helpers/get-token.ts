import { Request } from 'express';

const getToken = (req: Request) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders?.split(" ")[1];

  return token;
}

export default getToken;