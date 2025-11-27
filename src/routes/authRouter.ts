import express, { type Router } from 'express';
import { registerUser } from '../controllers/auth/registerUser';
import { validateRequest } from '../middlewares/validation';
import { UserRegisterSchema } from '../schema/userSchema';

export const authRouter: Router = express.Router();

authRouter.post('/register', validateRequest(UserRegisterSchema), registerUser);
