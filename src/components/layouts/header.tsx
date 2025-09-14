import { ToggleThemeButton } from "@/components/ui/toggle-theme-button";
import { Container } from "./container";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <Container className="flex items-center justify-between" asChild>
      <header>
        {children}
        <ToggleThemeButton />
      </header>
    </Container>
  );
}
