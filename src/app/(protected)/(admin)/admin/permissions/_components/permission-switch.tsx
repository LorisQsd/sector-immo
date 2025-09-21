"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { User } from "@/db/schema/auth.schema";
import { updatePermissionAction } from "../_actions/updatePermissionAction";

type PermissionSwitchProps = Pick<User, "id" | "isActive">;

export function PermissionSwitch({
  isActive,
  id,
}: Readonly<PermissionSwitchProps>) {
  const [isActiveState, setIsActiveState] = useState(isActive);

  const handleSwitchClick = async (isActive: boolean) => {
    setIsActiveState(isActive);
    const action = await updatePermissionAction(id, isActive);
    if (!action?.success) {
      setIsActiveState((prev) => !prev);
    }
  };

  return (
    <>
      <Switch
        id="permission-switch"
        className="cursor-pointer"
        checked={isActiveState}
        onCheckedChange={handleSwitchClick}
      />
      <Label htmlFor="permission-switch" className="sr-only w-fit">
        Activer ou désactiver la permission
      </Label>
    </>
  );
}
