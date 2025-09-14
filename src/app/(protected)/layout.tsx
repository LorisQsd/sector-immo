import { AppSidebar } from "@/components/layouts/app-sidebar";
import { ConnectedHeader } from "@/components/layouts/connected-header/connected-header";
import { Container } from "@/components/layouts/container";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col h-dvh w-full">
        <ConnectedHeader />
        <Container asChild>
          <main className="relative px-8 py-4 grow">{children}</main>
        </Container>
      </div>
    </SidebarProvider>
  );
}
