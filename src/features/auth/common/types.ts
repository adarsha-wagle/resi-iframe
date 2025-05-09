import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(5, "Required"),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  password: z.string().min(5, "Required"),
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
