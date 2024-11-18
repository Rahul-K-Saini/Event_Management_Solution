"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { UserItems } from "@/types/sidebar-items";

export function UserSidebar({ items }: { items: UserItems[] }) {
  const pathname = usePathname();
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
              ))}{" "}
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
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">
                john@example.com
              </span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
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
