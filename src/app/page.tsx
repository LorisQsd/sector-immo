import { Container } from "@/components/layouts/container";
import { SignInCard } from "./_components/SignInCard";

export default async function Home() {
  return (
    <Container size="sub" asChild>
      <main>
        <h1 className="text-2xl font-bold text-center mb-10">
          Bienvenue sur Sector Immo
        </h1>
        <SignInCard />
      </main>
    </Container>
  );
}
