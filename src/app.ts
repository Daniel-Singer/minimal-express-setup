import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/db';
import { userRouter } from './routes/userRouter';
import { authRouter } from './routes/authRouter';
import { orgRouter } from './routes/orgRouter';
import config from './config/config';

const app: Express = express();

connectDB();

app.use(express.json());
app.use(cookieParser(config.accessTokenSecret));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orgs', orgRouter);
// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
