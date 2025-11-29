import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/db';
import { userRouter } from './routes/userRouter';
import { authRouter } from './routes/authRouter';
import { orgRouter } from './routes/orgRouter';
import config from './config/config';
import { planeRouter } from './routes/planeRouter';
import { protect } from './middlewares/auth';
import { Schema, Types, type ObjectId } from 'mongoose';

const app: Express = express();

connectDB();

app.use(express.json());
app.use(cookieParser(config.accessTokenSecret));

// Routes
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

app.use('/api/v1/planes', planeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orgs', orgRouter);
// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
