import { Request, Response } from 'express';
import Pet from '../models/IPet';
import { Types } from 'mongoose';

const ObjectId = Types.ObjectId;


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
  },

  getAllUserAdoptions: async (req: Request, res: Response) => {
    // get user from token
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado!' });
    }
    const user = await getUserByToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Acesso negado!' });
    }

    const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt');

    res.status(200).json({ pets })
  },

  getPetById: async (req: Request, res: Response) => {
    const id = req.params.id;

    // check if id is valid
    if (!id) {
      res.status(401).json({ message: 'ID necessário' });
      return
    }
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido' });
      return
    }

    // check if pets exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' });
    }

    res.status(200).json({ pet: pet });
  },

  removePetById: async (req: Request, res: Response) => {
    const id = req.params.id;

    // check if id is valid
    if (!id) {
      res.status(401).json({ message: 'ID necessário' });
      return
    }
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido' });
      return
    }

    // check if pets exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' });
      return
    }

    // check if logged in user registered the pet
    const token = getToken(req);
    if (!token) {
      res.status(401).json({ message: 'Acesso negado!' });
      return
    }
    const user = await getUserByToken(token);
    if (!user) {
      res.status(401).json({ message: 'Acesso negado!' });
      return
    }

    if (pet !== null && pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!' });
      return
    }

    await Pet.findByIdAndDelete(id);
    res.status(200).json({ message: 'Pet deletado com sucesso!' });
  },

  updatePet: async (req: Request, res: Response) => {
    const id = req.params.id

    const { name, age, weight, color, available } = req.body;

    const updatedData: Record<string, any> = {};

    // check if pets exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' });
    }

    // check if logged in user registered the pet
    const token = getToken(req);
    if (!token) {
      res.status(401).json({ message: 'Acesso negado!' });
      return
    }
    const user = await getUserByToken(token);
    if (!user) {
      res.status(401).json({ message: 'Acesso negado!' });
      return
    }

    if (pet !== null && pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!' });
      return
    }

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    } else {
      updatedData.name = name;
    }

    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatório!' })
      return
    } else {
      updatedData.age = age;
    }

    if (!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!' })
      return
    } else {
      updatedData.weight = weight;
    }

    if (!color) {
      res.status(422).json({ message: 'A cor é obrigatório!' })
      return
    } else {
      updatedData.color = color;
    }

    await Pet.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Pet atualizado com sucesso!" });
  }
}