"use client";

import { logOut } from "@/auth/nextjs/action";
import { Button } from "../ui/button";

export function LogoutButton(props: React.ComponentProps<typeof Button>) {
  return <Button onClick={() => logOut()} {...props} />;
}
