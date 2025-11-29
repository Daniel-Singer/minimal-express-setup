import { NextFunction, Request, Response } from 'express';
import { Org } from '../../models/orgModel';
import mongoose, { Schema } from 'mongoose';
import { User } from '../../models/userModel';
import { hashPassword } from '../../util/auth/password';

export const registerOrg = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const exists = await Org.findOne({
      name: req.body.name,
    });
    if (!exists) {
      const { email, ...orgData } = req.body;
      const org = new Org(orgData);

      await org.save({ session });

      console.log(org);

      const adminPassword = hashPassword('password');

      const orgAdmin = new User({
        orgId: org._id,
        userName: 'admin',
        password: adminPassword,
        email: req.body.email,
      });

      await orgAdmin.save({ session });

      await session.commitTransaction();

      res.sendStatus(201);
    }

    res.status(409);

    throw new Error('Org already exists');
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};
