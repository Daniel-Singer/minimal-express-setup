import express, { type Router } from 'express';
import { listUsers } from '../controllers/users/listUsers';

export const userRouter: Router = express.Router();

userRouter.get('/', listUsers);
