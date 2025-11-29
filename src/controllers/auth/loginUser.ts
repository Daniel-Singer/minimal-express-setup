import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/userModel';
import config from '../../config/config';

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    console.log(typeof password);

    if (!email || !password) {
      res.status(400);
      throw new Error('Benutzername und Passwort erforderlich');
    }

    const user = await User.findOne({
      email: email,
    }).select('_id email orgId password');

    if (!user) {
      res.status(404);
      throw new Error('Ungültige E-Mail Adresse');
    }

    const isValid = await user.comparePasswords(password);

    if (isValid) {
      const secret = config.accessTokenSecret;

      const accessToken = jwt.sign(
        {
          user: {
            _id: user._id,
            email: user.email,
            orgId: user.orgId,
          },
        },
        secret,
        {
          expiresIn: '1d',
        },
      );
      const refreshToken = jwt.sign(
        {
          user: {
            _id: user._id,
            email: user.email,
            orgId: user.orgId,
          },
        },
        secret,
        { expiresIn: '1d' },
      );
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        signed: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        user: {
          _id: user._id,
          email: user.email,
          accessToken: accessToken,
        },
      });
    } else {
      res.status(401);
      throw new Error('Ungültiges Passwort');
    }
  } catch (error) {
    next(error);
  }
};
