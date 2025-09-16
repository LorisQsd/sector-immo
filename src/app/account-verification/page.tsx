import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromSession } from "@/auth/core/session";
import { Container } from "@/components/layouts/container";
import { Header } from "@/components/layouts/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PATHS } from "@/constants/paths";

export default async function AccountVerificationPage() {
  const user = await getUserFromSession(await cookies());

  if (!user) redirect(PATHS.root);

  return (
    <>
      <Header />
      <Container size="sub" asChild>
        <main>
          <h1 className="text-2xl font-bold text-center mb-10">
            Première connexion
          </h1>
          <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
              <CardTitle className="text-center">
                Créez votre nouveau mote de passe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center italic">form incoming...</p>
            </CardContent>
          </Card>
        </main>
      </Container>
    </>
  );
}
