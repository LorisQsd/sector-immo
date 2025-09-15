import { AppSidebar } from "@/components/layouts/app-sidebar/app-sidebar";
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
        <Container className="relative md:px-16 py-4 grow" asChild>
          <main>{children}</main>
        </Container>
      </div>
    </SidebarProvider>
  );
}
