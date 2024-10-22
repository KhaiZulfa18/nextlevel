import { IconChevronLeft, IconMountain } from "@tabler/icons-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { useMenuItems } from "@/utils/menu";
import Link from "next/link";
import { Button } from "../ui/button";
import clsx from "clsx";
import AppSidebarItem from "./app-sidebar-item";

const SidebarTrigger = () => {

    const { toggleSidebar, state } = useSidebar();

    return (
        <div className={clsx("invisible md:visible absolute top-[12px] z-20", state === 'collapsed' ? '-right-[36px]' : '-right-[16px]' )}>
                <Button onClick={toggleSidebar} className="rounded-md w-8 h-8"  variant="outline" size="icon" >
                    <IconChevronLeft
                    className={clsx(
                        "h-4 w-4 transition-transform ease-in-out duration-500",
                        state === 'collapsed' ? "rotate-180" : "rotate-0"
                    )}
                    />
                </Button>
        </div>
)};

export default function AppSidebar({}) {
 
    const menuItems = useMenuItems();

    const { state } = useSidebar();

    return (
        <Sidebar side="left" collapsible="icon">
            <SidebarTrigger/>
            <SidebarHeader>
                <div className="w-[--radix-popper-anchor-width] text-2xl pt-3 pb-1 flex justify-center gap-1 items-center">
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
                                <AppSidebarItem item={item} index={index}/>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>       
    )
}