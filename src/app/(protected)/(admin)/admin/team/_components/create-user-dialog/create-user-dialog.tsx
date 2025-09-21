"use client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
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
import { CreateUserForm } from "./create-user-form";

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <PlusIcon />
          Ajouter un utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="w-sm max-h-[90dvh]">
        <ScrollArea className="max-h-[80dvh]">
          <DialogHeader>
            <DialogTitle>Créer un utilisateur</DialogTitle>
            <DialogDescription>
              Seul les administrateurs peuvent créer un utilisateur.
            </DialogDescription>
          </DialogHeader>
          <CreateUserForm closeDialog={closeDialog} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
