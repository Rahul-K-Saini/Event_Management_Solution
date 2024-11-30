"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/dal";
import { user } from "@/types/user";
import { logout } from "@/app/(public)/(auth)/login/actions";
import {
  userItems,
  companyItems,
} from "@/app/(private)/dashboard/_components/sidebar-items";

export function UserSidebar() {
  const [user, setUser] = React.useState<user | null>(null);
  const [loading, setLoading] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    const res = await getUser();
    setLoading(false);
    setUser(res);
  };

  const items =
    user?.role === "company"
      ? companyItems
      : user?.role === "user"
      ? userItems
      : [];

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <Sidebar className="border-r">
        <SidebarHeader className="border-b px-4 py-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-32" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="my-2">
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2 flex-grow">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  }

  return (
    <>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b px-4 py-2">
          <Link href="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Event Manager</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              {items.map((item) => (
                <SidebarMenu key={item.title}>
                  {item.submenu ? (
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        {item.icon && item.icon}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {item.submenu.map((subItem) => (
                          <Link
                            href={subItem.url!}
                            key={subItem.title}
                            passHref
                            legacyBehavior
                          >
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                isActive={pathname === subItem.url}
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </Link>
                        ))}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  ) : (
                    <Link href={item.url!} passHref legacyBehavior>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive={pathname === item.url}>
                          {item.icon && item.icon}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  )}
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback>
                {user?.name?.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger />
    </>
  );
}

export default UserSidebar;
