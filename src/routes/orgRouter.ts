import express, { type Router } from 'express';
import { registerOrg } from '../controllers/auth/registerOrg';

export const orgRouter: Router = express.Router();

orgRouter.post('/', registerOrg);
