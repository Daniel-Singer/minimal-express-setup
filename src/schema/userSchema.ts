import z from 'zod';

export const UserRegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
});

export const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type TUser = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  orgId: z.string(),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string(),
});
