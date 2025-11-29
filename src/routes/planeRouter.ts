import express, { type Router } from 'express';
import { listPlanes } from '../controllers/plane/listPlanes';
import { addPlane } from '../controllers/plane/addPlane';

export const planeRouter: Router = express.Router();

planeRouter.get('/', listPlanes);

planeRouter.post('/', addPlane);
