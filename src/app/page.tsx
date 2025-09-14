import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Container size="sub" asChild>
      <main>
        <Button asChild variant="link">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </main>
    </Container>
  );
}
