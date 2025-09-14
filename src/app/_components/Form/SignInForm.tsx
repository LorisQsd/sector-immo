"use client";
import { LoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { signInAction } from "@/auth/nextjs/action";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm() {
  const [state, action, pending] = useActionState(signInAction, null);
  return (
    <form action={action}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
          {state?.errors?.email && (
            <ErrorMessage>{state.errors.email}</ErrorMessage>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" name="password" required />
          {state?.errors?.password && (
            <ErrorMessage>{state.errors.password}</ErrorMessage>
          )}
        </div>
      </div>

      <Button disabled={pending} className="w-full mt-6" type="submit">
        {pending ? <LoaderCircle className="animate-spin" /> : "Se connecter"}
      </Button>
    </form>
  );
}
