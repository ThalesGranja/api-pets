import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/IUser';
import jwt from 'jsonwebtoken';

// helpers
import createUserToken from '../helpers/create-user-token';
import getToken from '../helpers/get-token';

export const UserController = {
  register: async (req: Request, res: Response) => {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório' });
      return
    }
    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório' });
      return
    }
    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório' });
      return
    }
    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatória' });
      return
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: 'A senha e a confirmação de senha devem ser iguais!' })
      return
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      phone,
      password: passwordHash
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório' });
      return
    }
    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return
    }

    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({ message: 'Não há usuário cadastrado com este e-mail!' });
      return
    }

    // check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: 'Senha inválida' });
      return
    }

    await createUserToken(user, req, res);
  },

  checkUser: async (req: Request, res: Response) => {
    let currentUser

    console.log(req.headers.authorization)

    if (req.headers.authorization) {
      const token = getToken(req);

      if (!token) {
        currentUser = null;
      } else {
        try {
          const decoded = jwt.verify(token, 'nossosecret') as { id: string };
          currentUser = await User.findById(decoded.id);
        } catch (err) {
          currentUser = null;
        }
      }
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  },

  getUserById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' });
      return
    }

    res.status(200).json({ user });
  },

  editUser: async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Deu certo o update!' });
    return
  }
}