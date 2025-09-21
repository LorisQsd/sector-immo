"use client";

import { useActionState } from "react";
import { updatePasswordAction } from "@/auth/nextjs/action";
import { InputDecorator } from "@/components/common/input-decorator";
import { LoadingButton } from "@/components/common/loading-button";

type NewPasswordFormProps = {
  userId: Parameters<typeof updatePasswordAction>[0];
};

export function NewPasswordForm({ userId }: NewPasswordFormProps) {
  const updatePasswordActionWithUserId = updatePasswordAction.bind(
    null,
    userId
  );
  const [state, action, pending] = useActionState(
    updatePasswordActionWithUserId,
    null
  );

  return (
    <form action={action}>
      <InputDecorator
        label="Mot de passe"
        name="password"
        slotProps={{ input: { type: "password" } }}
        errorMessage={state?.errors?.password}
      />
      <InputDecorator
        label="Confirmer le mot de passe"
        name="passwordConfirmation"
        slotProps={{ input: { type: "password" } }}
        errorMessage={state?.errors?.passwordConfirmation}
      />

      <LoadingButton isLoading={pending} className="w-full mt-6" type="submit">
        Valider
      </LoadingButton>
    </form>
  );
}
