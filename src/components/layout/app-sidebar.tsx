"use client";
import { IconLogout, IconMountain, IconUser } from "@tabler/icons-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { useMenuItems } from "@/utils/menu";
import AppSidebarItem from "./app-sidebar-item";
import { SidebarToggle } from "./app-sidebar-trigger";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "@/lib/credential";

export default function AppSidebar({user}: {user: {id: string, name: string} | null}) {
 
    const menuItems = useMenuItems();

    const { state, isMobile } = useSidebar();

    return (
        <Sidebar side="left" collapsible="icon">
            <SidebarToggle/>
            <SidebarHeader>
                <div className="w-[--radix-popper-anchor-width] text-2xl py-1 md:py-2 flex justify-center gap-1 items-center">
                    <IconMountain size={24}/>
                    {state === 'expanded' && <span className="font-mono">NextLevel</span>}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item, index) => (
                                <AppSidebarItem item={item} index={index} key={index}/>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {isMobile && (
                <SidebarFooter>
                    <SidebarMenu className="pb-5">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Button variant={'outline'} className="py-5 md:py-2" asChild>
                                    <Link href="/profile"><IconUser size={20}/> {user?.name}</Link>
                                </Button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <form action={signOut} className="w-full">
                            <SidebarMenuButton asChild>
                                <Button variant={'default'} className="py-5 md:py-2">
                                    <IconLogout size={20}/> Sign Out
                                </Button>
                            </SidebarMenuButton>
                            </form>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            )}
        </Sidebar>       
    )
}