import { z } from "zod";

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const createUserSchema = z
  .object({
    name: z.string().min(1, { message: "Nom requis" }),
    email: z.email({ message: "Email invalide" }),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      }),
    passwordConfirmation: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
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
