import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, type ZodSchema } from 'zod';

export const validateRequest =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse only the request body with the schema
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((e) => {
          const fieldPath = e.path.length > 0 ? e.path.join('.') : 'root';
          return `${fieldPath}: ${e.message}`;
        });

        const errorMessage =
          errors.length === 1
            ? `Invalid input: ${errors[0]}`
            : `Invalid input (${errors.length} errors): ${errors.join('; ')}`;

        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: errorMessage,
          errors: err.issues,
        });
      } else {
        // Handle non-Zod errors
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'An unexpected error occurred during validation',
        });
      }
    }
  };
