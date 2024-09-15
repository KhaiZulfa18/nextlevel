"use client";
import { IconChevronDown, IconChevronRight, IconMenu2, IconMountain } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { signOut } from "@/lib/credential";
import { menuItems } from "@/utils/menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import Link from "next/link";
import { useState } from "react";

export default function SidebarSheet({user}: {user: {id: string, name: string}}) {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl lg:hidden">
                    <IconMenu2 size={24} />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <IconMountain size={24}/>
                        <span className="text-lg font-mono">NextLevel</span>
                    </SheetTitle>
                </SheetHeader>
                <nav className="grid space-y-4">
                    <ul className="mt-6 space-y-2">
                        {menuItems.map((item, index) => (
                            <MenuItemList key={index} item={item} index={index} />
                        ))}
                    </ul>
                    <Button variant="outline">{user?.name}</Button>
                    <form action={signOut} className="w-full">
                        <Button variant={'default'} size={'sm'} className="w-full">
                            Sign Out 
                        </Button>
                    </form>
                </nav>
            </SheetContent>
        </Sheet>
    )
}


const MenuItemList = ({item, index}: {item: any, index: number}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <li key={index}>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full border px-3 py-2 rounded-md border-accent">
                    {item.children ? (
                        <>
                        <div className="">
                            {item.label}
                        </div>
                        {isOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16}/>}
                        </>
                    ) : (
                        <Link key={index} href={'/'} prefetch={false}>
                            {item.label}
                        </Link>
                    )}
                </CollapsibleTrigger>
                {item.children && (
                    <CollapsibleContent className="pl-4" asChild>
                        <div className="flex flex-col">
                            {item.children.map((child: any, index: number) => (
                                <CollapsibleContent key={index} className="border-l px-3 py-2">
                                    <Link key={index} href={'/'} prefetch={false}>
                                        {child.label}
                                    </Link>
                                </CollapsibleContent>
                            ))}
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>
        </li>
    )
}