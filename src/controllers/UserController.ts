import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/IUser';

export const UserController = {
  create: async (req: Request, res: Response) => {
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
      res.status(201).json({ message: 'Usuário criado!', newUser });
    } catch (error) {
      res.status(500).json({ message: error });
    }

  }
}