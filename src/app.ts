import express, { type Express } from 'express';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();

app.use(express.json());

// Routes

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
