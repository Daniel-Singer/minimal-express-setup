import { Request, Response, NextFunction } from 'express';
import { Plane } from '../../models/planeModel';

export const listPlanes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const planes = await Plane.find({
      orgId: req.auth.orgId,
    });
    res.status(200).json(planes);
  } catch (error) {
    next(error);
  }
};
