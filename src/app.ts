import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/db';
import { authRouter } from './routes/authRouter';
import config from './config/config';
import { protect } from './middlewares/auth';

const app: Express = express();

connectDB();

app.use(express.json());
app.use(cookieParser(config.accessTokenSecret));

// public routes
app.use('/api/v1/auth', authRouter);

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        orgId: string;
      };
    }
  }
}

app.use(protect);

// protected routes go here

app.use(errorHandler);

export default app;
