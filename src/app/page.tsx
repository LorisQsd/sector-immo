import { Container } from "@/components/layouts/container";
import { AuthForm } from "./AuthForm";

export default function Home() {
  return (
    <Container size="sub" asChild>
      <main>
        <AuthForm />
      </main>
    </Container>
  );
}
