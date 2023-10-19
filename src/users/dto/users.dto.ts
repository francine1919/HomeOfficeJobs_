import { z } from 'zod';

export const userSignUp = z.object({
  name: z.string().min(3),
  password: z.string().min(6),
  email: z.string().min(6).email(),
});

export const userLogin = userSignUp.omit({ name: true });

export const userAuthentication = userLogin.extend({ id: z.string().uuid() });

// extract the inferred type like this

export type UserSignup = z.infer<typeof userSignUp>;
export type UserLogin = z.infer<typeof userLogin>;
export type UserAuthentication = z.infer<typeof userAuthentication>;
