import { ToggleThemeButton } from "@/components/ui/toggle-theme-button";
import { Container } from "./container";

export function Header() {
  return (
    <Container asChild>
      <header className="flex items-center justify-between p-4">
        <ToggleThemeButton />
      </header>
    </Container>
  );
}
