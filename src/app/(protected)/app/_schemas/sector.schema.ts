import { z } from "zod";

export const sectorSchema = z.object({
  color: z.string().min(1, { error: "La couleur du secteur est requise" }),
  userId: z.string().min(1, { error: "L'utilisateur est requis" }),
});

/**
 *   cityName: z.string().min(1, { error: "La ville est requise" }),
  zipCode: z
    .string()
    .length(5, {
      message: "Le code postal doit contenir exactement 5 chiffres",
    })
    .regex(/^\d{5}$/, {
      message: "Le code postal doit être composé de 5 chiffres",
    }),
 */
