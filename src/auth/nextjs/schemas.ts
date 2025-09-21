import { z } from "zod";

const commonMinCharMessage =
  "Votre mot de passe doit contenir au moins 8 caractères";

export const signInSchema = z.object({
  email: z.email({ message: "Email invalide" }),
  password: z.string().min(8, {
    message: commonMinCharMessage,
  }),
});

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email({ message: "Email invalide" }),
  password: z.string().min(8, {
    message: commonMinCharMessage,
  }),
});

export const updatePasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: commonMinCharMessage,
    }),
    passwordConfirmation: z.string().min(8, {
      message: commonMinCharMessage,
    }),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["passwordConfirmation"],
      });
    }
  });
