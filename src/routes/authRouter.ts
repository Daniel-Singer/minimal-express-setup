import express, { type Router } from 'express';
import { registerUser } from '../controllers/auth/registerUser';
import { validateRequest } from '../middlewares/validation';
import { UserLoginSchema, UserRegisterSchema } from '../schema/userSchema';
import { loginUser } from '../controllers/auth/loginUser';

export const authRouter: Router = express.Router();

authRouter.post('/register', validateRequest(UserRegisterSchema), registerUser);

authRouter.post('/login', validateRequest(UserLoginSchema), loginUser);
