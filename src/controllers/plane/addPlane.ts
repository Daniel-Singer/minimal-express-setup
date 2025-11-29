import { Request, Response, NextFunction } from 'express';
import { Plane } from '../../models/planeModel';

export const addPlane = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const exists = await Plane.findOne({
      name: req.body.name,
    });

    if (!exists) {
      const plane = await Plane.create({
        ...req.body,
        orgId: req.auth.orgId,
      });
      res.status(201).json(plane);
    }

    console.log(exists);

    res.status(409);
    throw new Error('Plane already exists');
  } catch (error) {
    next(error);
  }
};
