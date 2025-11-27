import { NextFunction, Request, Response } from 'express';

export const listUsers = async (req: Request, res: Response) => {
  //   const user = await User.findById(req.params.id);
  res.status(200).json({});
};
