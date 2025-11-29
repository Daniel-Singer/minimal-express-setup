import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
      res.status(403);
      throw new Error('No auth credentials provided');
    }

    const decoded = jwt.verify(
      accessToken,
      config.accessTokenSecret,
    ) as JwtPayload;

    req.auth = {
      orgId: decoded.user.orgId,
      userId: decoded.user._id,
    };

    next();
  } catch (error) {
    next(error);
  }
};
