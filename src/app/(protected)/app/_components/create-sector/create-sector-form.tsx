"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { InputDecorator } from "@/components/common/input-decorator";
import { LoadingButton } from "@/components/common/loading-button";
import { ErrorMessage } from "@/components/ui/error-message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SuccessMessage } from "@/components/ui/success-message";
import type { getCachedAllUsers } from "@/services/users.service";
import { createSectorAction } from "../../_actions/create-sector-action";
import { sectorSchema } from "../../_schemas/sector.schema";

type CreateSectorFormProps = {
  users: Awaited<ReturnType<typeof getCachedAllUsers>>;
};

export const CreateSectorForm = ({
  users,
}: Readonly<CreateSectorFormProps>) => {
  const form = useForm<z.infer<typeof sectorSchema>>({
    resolver: zodResolver(sectorSchema),
  });

  const [state, action, pending] = useActionState(createSectorAction, null);

  return (
    <Form {...form}>
      <form action={action} className="space-y-4 mt-4 px-2">
        <InputDecorator
          errorMessage={state?.errors?.color}
          name="color"
          label="Couleur"
        />

        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affecter le secteur à :</FormLabel>
              <Select
                name="userId"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un utilisateur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map(({ id, name }) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.userId && (
                <ErrorMessage>{state.errors.userId}</ErrorMessage>
              )}
            </FormItem>
          )}
        />

        {state?.success === false && (
          <ErrorMessage>Erreur lors de la création du secteur...</ErrorMessage>
        )}

        {state?.success === true && (
          <SuccessMessage className="flex gap-1 items-center justify-center">
            <CheckCircle className="size-4 inline" /> Secteur créé avec succès
          </SuccessMessage>
        )}

        <LoadingButton
          isLoading={pending}
          className="w-full mt-4"
          type="submit"
        >
          Créer un secteur
        </LoadingButton>
      </form>
    </Form>
  );
};
