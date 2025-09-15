"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, LoaderCircle } from "lucide-react";
import Form from "next/form";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { signUpAction } from "@/auth/nextjs/action";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createUserSchema } from "./create-user.schema";

export function CreateUserForm() {
  const [state, action, pending] = useActionState(signUpAction, null);
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
  });

  // TODO: Find a way to prevent execution the form action when the form is not valid

  return (
    <Form action={action} className="space-y-4 mt-4 px-2" autoComplete="off">
      <div>
        <Label htmlFor="name" className="mb-2">
          Nom
        </Label>
        <Input id="name" type="text" required {...register("name")} />
        {state?.errors?.name && (
          <ErrorMessage className="text-xs">{state.errors.name}</ErrorMessage>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          autoComplete="new-email"
          type="email"
          required
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <ErrorMessage className="text-xs">
            {errors.email.message}
          </ErrorMessage>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="mb-2">
          Mot de passe
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent className="max-w-2xs">
              <p>
                Le mot de passe est provisoire. Pensez à le transmettre au
                nouvel utilisateur.
              </p>
              <p>Ce dernier pourra le modifier après sa première connexion.</p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <Input
          id="password"
          {...register("password")}
          autoComplete="new-password"
          type="password"
          required
        />
        {errors.password && (
          <ErrorMessage className="text-xs">
            {errors.password.message}
          </ErrorMessage>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="passwordConfirmation">Confirmer le mot de passe</Label>
        <Input
          id="passwordConfirmation"
          {...register("passwordConfirmation")}
          autoComplete="new-password"
          type="password"
          required
        />
        {errors.passwordConfirmation && (
          <ErrorMessage className="text-xs">
            {errors.passwordConfirmation.message}
          </ErrorMessage>
        )}
      </div>

      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button variant="outline">Annuler</Button>
        </DialogClose>

        <Button disabled={pending}>
          {pending && <LoaderCircle className="animate-spin" />}
          Créer
        </Button>
      </DialogFooter>
    </Form>
  );
}
