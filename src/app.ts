import express, { type Express } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/db';
import { userRouter } from './routes/userRouter';
import { authRouter } from './routes/authRouter';

const app: Express = express();

connectDB();

app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
