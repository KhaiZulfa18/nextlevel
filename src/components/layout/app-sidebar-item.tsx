import Link from "next/link";
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem } from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export default function AppSidebarItem({item, index} : {item: any, index: number}) {

    const hasChildren = item.children && item.children.length > 0;

    return (
        <>
        {hasChildren ? (
            <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem key={index}>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
                            {item.icon} {item.label}
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.children.map((child: any, index: number) => (
                                <SidebarMenuSubItem key={index}>
                                    <SidebarMenuButton key={index}>
                                        <>{child.label}</>
                                    </SidebarMenuButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        ) : (
            <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                    {item.path && <Link href={item.path}>{item.icon} {item.label}</Link>}
                </SidebarMenuButton>
            </SidebarMenuItem>
        )}
        </>
    )
}