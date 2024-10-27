"use server";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { IconLogout, IconUser } from "@tabler/icons-react";
// import { signOut } from "@/lib/credential";

export default function AppSidebarFooter() {

    return (
        <SidebarFooter>
            <SidebarMenu className="pb-5">
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Button variant={'outline'} className="py-5 md:py-2" asChild>
                            <Link href="/profile"><IconUser size={20}/> </Link>
                        </Button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    {/* <form action={signOut} className="w-full"> */}
                    <SidebarMenuButton asChild>
                        <Button variant={'default'} className="py-5 md:py-2">
                            <IconLogout size={20}/> Sign Out
                        </Button>
                    </SidebarMenuButton>
                    {/* </form> */}
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}