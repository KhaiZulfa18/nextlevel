"use client";
import { IconChevronDown, IconChevronRight, IconChevronsRight, IconDiamonds, IconDiamondsFilled, IconLogout, IconMenu2, IconMountain } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { signOut } from "@/lib/credential";
import { useMenuItems } from "@/utils/menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

export default function SidebarSheet({user}: {user: {id: string, name: string} | null}) {

    const menuItems = useMenuItems();
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl lg:hidden">
                    <IconMenu2 size={24} />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <IconMountain size={24}/>
                        <span className="text-lg font-mono">NextLevel</span>
                    </SheetTitle>
                </SheetHeader>
                <nav className="grid gap-1.5 font-medium">
                    <ul className="mt-6 space-y-2">
                        {menuItems.map((item, index) => (
                            <MenuItemList key={index} item={item} index={index} />
                        ))}
                    </ul>
                </nav>
                <div className="mt-auto grid gap-2 py-2">
                    <Button variant="outline" className="rounded-xl" asChild>
                        <Link href="/profile">{user?.name}</Link>
                    </Button>
                    <form action={signOut} className="w-full">
                        <Button variant={'default'} size={'sm'} className="w-full rounded-xl flex gap-2">
                            Sign Out 
                            <IconLogout size={20} />
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    )
}


const MenuItemList = ({ item, index }: { item: any; index: number }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <li key={index}>
            {item.children ? (
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <CollapsibleTrigger className={clsx("mx-[-0.65rem] w-full flex items-stretch justify-between gap-4 rounded-xl px-3 py-2 text-gray-900 dark:text-gray-100")}>
                        <div className="flex gap-4">
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                        {isOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16}/>}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1" asChild>
                        <div className="flex flex-col pl-4 space-y-2">
                            {item.children.map((child: any, index: number) => (
                                <div className={clsx("flex items-center gap-1 rounded-xl px-3", child.active ? 'bg-accent' : '')} key={index}>
                                    <IconChevronsRight size={12} key={index} />
                                    <Link
                                        key={index}
                                        href={child.path}
                                        className={clsx("mx-[-0.65rem] flex min-w-full items-stretch gap-4 rounded-xl py-2 text-gray-900 dark:text-gray-100 hover:bg-accent")}
                                    >
                                        <span>{child.icon}</span>
                                        <span>{child.label}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            ) : (
                <Link
                    key={index}
                    href={item.path}
                    className={clsx("mx-[-0.65rem] flex items-stretch gap-4 rounded-xl px-3 py-2 text-gray-900 dark:text-gray-100 hover:bg-accent", item.active ? 'bg-accent' : '')}
                >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                </Link>
            )}
        </li>
    );
};