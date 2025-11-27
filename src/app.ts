import express, { type Express } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/db';

const app: Express = express();

connectDB();

app.use(express.json());

// Routes

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
