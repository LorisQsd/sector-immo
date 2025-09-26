import { PlusIcon } from "lucide-react";
import { cookies } from "next/headers";
import { getUserFromSession } from "@/auth/core/session";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateSectorWrapper } from "./create-sector-wrapper";

export const CreateSectorDialog = async () => {
  const user = await getUserFromSession(await cookies());
  if (user?.role !== "admin") {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex ml-auto">
          <PlusIcon />
          Ajouter un secteur
        </Button>
      </DialogTrigger>
      <DialogContent className="w-sm max-h-[90dvh]">
        <ScrollArea className="max-h-[80dvh]">
          <DialogHeader>
            <DialogTitle>Créer un secteur</DialogTitle>
            <DialogDescription>
              Seul les administrateurs peuvent créer un secteur.
            </DialogDescription>
          </DialogHeader>
          <CreateSectorWrapper />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
