import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Email invalide" }),
  password: z
    .string()
    .min(8, {
      message: "Votre mot de passe doit contenir au moins 8 caractères",
    }),
});

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email({ message: "Email invalide" }),
  password: z
    .string()
    .min(8, {
      message: "Votre mot de passe doit contenir au moins 8 caractères",
    }),
});
