import Link from "next/link";
import { paths } from "@/constants/paths";
import { ToggleThemeButton } from "../ui/toggle-theme-button";
import { Container } from "./container";

export function Header() {
  return (
    <Container asChild>
      <header className="flex items-center justify-between p-4">
        <Link className="text-2xl font-bold" href={paths.root}>
          Sector Immo
        </Link>
        <ToggleThemeButton />
      </header>
    </Container>
  );
}
