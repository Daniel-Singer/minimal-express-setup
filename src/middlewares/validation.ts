import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodTypeAny } from 'zod';

export const validateRequest =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((e) => {
          const fieldPath = e.path.length > 0 ? e.path.join('.') : 'root';
          return `${fieldPath}: ${e.message}`;
        });
        error.message =
          errors.length === 1
            ? `Invalid input: ${errors[0]}`
            : `Invalid input (${errors.length} errors): ${errors.join('; ')}`;

        res.status(StatusCodes.BAD_REQUEST);
        next(error);
      }
    }
  };
