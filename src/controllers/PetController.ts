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
    const { name, age, weight, color } = req.body;

    const available = true;

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }
    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatório!' })
      return
    }
    if (!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!' })
      return
    }
    if (!color) {
      res.status(422).json({ message: 'A cor é obrigatório!' })
      return
    }

    // get pet owner
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado!' });
    }
    const user = await getUserByToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Acesso negado!' });
    }

    // create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
      },
    })

    try {
      const newPet = await pet.save();
      res.status(201).json({ message: 'Pet cadastrado com sucesso!', newPet });
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  getAll: async (req: Request, res: Response) => {
    const pets = await Pet.find().sort('-createdAt');

    res.status(200).json({ pets: pets, });
  },

  getAllUserPets: async (req: Request, res: Response) => {
    // get user from token
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado!' });
    }
    const user = await getUserByToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Acesso negado!' });
    }

    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt');

    res.status(200).json({ pets })
  }
}