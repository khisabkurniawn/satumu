"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Building2, LayoutDashboard, VectorSquare } from "lucide-react";
import { logout } from "@/app/actions/auth-logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSettings,
} from "@tabler/icons-react";
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Organisasi",
      url: "/organisasi",
      icon: Building2,
    },
    {
      title: "Wilayah Geografis",
      url: "/wilayah-geografis",
      icon: VectorSquare,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
  navSecondary: [
    {
      title: "Pengaturan",
      url: "/pengaturan",
      icon: IconSettings,
    },
    {
      title: "Bantuan",
      url: "/bantuan",
      icon: IconHelp,
    },
  ],
};

type AppUser = {
  user: {
    email: string | null;
  };
  profile: {
    full_name: string | null;
    role: string | null;
    avatar_url: string | null;
  };
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: AppUser;
}) {
  const { isMobile } = useSidebar();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await logout();
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <span className="mt-1 font-bold font-el-messiri text-2xl bg-linear-to-tl from-[#2f318b] to-[#01612e] bg-clip-text text-transparent">
                  SatuMu
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Manajemen Aplikasi</SidebarGroupLabel>
          <SidebarMenu>
            {data.documents.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer"
                >
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage
                      src={user.profile.avatar_url ?? undefined}
                      alt={user.profile.full_name || "User Avatar"}
                    />
                    <AvatarFallback className="rounded-lg">S</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.profile.full_name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.user.email}
                    </span>
                  </div>
                  <IconDotsVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user.profile.avatar_url ?? undefined}
                        alt={user.profile.full_name || "User Avatar"}
                      />
                      <AvatarFallback className="rounded-lg">S</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user.profile.full_name}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {user.user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:cursor-pointer" asChild>
                    <Link href="/akun">
                      <IconUserCircle />
                      Akun
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <IconCreditCard />
                    Penagihan
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <IconNotification />
                    Pemberitahuan
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  disabled={loading}
                  onClick={handleLogout}
                  onSelect={(e) => e.preventDefault()}
                >
                  <IconLogout />
                  <span className="ml-2">
                    {loading ? "Loading..." : "Log out"}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
