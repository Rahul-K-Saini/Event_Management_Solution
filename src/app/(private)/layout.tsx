import { SidebarProvider} from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/ui/user-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <UserSidebar  />
        <main className="mt-10">
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
