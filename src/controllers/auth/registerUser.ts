import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/userModel';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existingUser = await User.findOne({
      $and: [
        {
          firstName: req.body.firstName,
        },
        {
          lastName: req.body.lastName,
        },
      ],
    });

    if (existingUser) {
      res.status(409);
      throw new Error('User already exists');
    }

    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
