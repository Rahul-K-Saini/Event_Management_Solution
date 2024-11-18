import { SidebarProvider} from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/ui/user-sidebar";
import { userItems,companyItems } from "./_components/sidebar-items";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <UserSidebar items={userItems} />
        <main className="mt-10">
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
