import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";

export default function Home() {
  return (
    <Container size="sub" asChild>
      <main>
        <Button asChild variant="link">
          <Link href={paths.signUp}>Sign Up</Link>
        </Button>
        <Button asChild variant="link">
          <Link href={paths.signIn}>Sign In</Link>
        </Button>
      </main>
    </Container>
  );
}
