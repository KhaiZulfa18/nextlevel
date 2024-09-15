"use client";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useState } from "react";
import { IconBook, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import clsx from "clsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface Props {
    item: {
        label: string;
        path: string;
        children?: any;
    };
    isSidebarOpen: boolean;
}

export default function MenuItems({item, isSidebarOpen}: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <>
        {isSidebarOpen ? (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className={clsx("flex items-center w-full text-sm hover:bg-accent rounded-md",(isSidebarOpen ? 'p-2 justify-between' : 'py-2 px-1 justify-center'))}>
                    <MenuItemList item={item} isSidebarOpen={isSidebarOpen} hasChildren={hasChildren} isOpen={isOpen}/>
                </CollapsibleTrigger>
                {hasChildren && (
                    <CollapsibleContent className="border-l pl-4" asChild>
                        <div className="flex flex-col">
                            {item.children.map((child: any, index: number) => (
                                <MenuItemDropdown key={index} item={child} index={index}/>
                            ))}
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>  
        ) : (
            <DropdownMenu>
                <DropdownMenuTrigger className={clsx("flex items-center w-full text-sm hover:bg-accent rounded-md",(isSidebarOpen ? 'p-2 justify-between' : 'py-2 px-1 justify-center'))}>
                    <MenuItemList item={item} isSidebarOpen={isSidebarOpen} hasChildren={hasChildren} isOpen={isOpen}/>
                </DropdownMenuTrigger>
                {hasChildren && (
                    <DropdownMenuContent className="w-40" side="right" sideOffset={20}>
                        <DropdownMenuLabel className="text-xs">{item.label}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {item.children.map((child: any, index: number) => (
                            <DropdownMenuItem key={index} asChild>
                                <Link href={child.path} prefetch={false} key={index}>
                                    {child.label}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        )}
        </>
    )
}

const MenuItemDropdown = ({item, index}: {item: any, index: number}) => {
    return (
        <CollapsibleContent key={index} className="flex items-center w-full p-2 text-sm hover:bg-accent justify-between rounded-md" asChild>
            <Link key={index} href={item.path} prefetch={false} className="">{item.label}</Link>
        </CollapsibleContent>
    )
}

const MenuItemList = ({item, isSidebarOpen, isOpen, hasChildren}: {item: any, isSidebarOpen: boolean, isOpen: boolean, hasChildren: boolean}) => {

    return (
        <>
        {hasChildren ? (
            <>
                <div className="flex items-center gap-2">
                    <IconBook size={20}/>
                    {isSidebarOpen ? item.label : ''}
                </div>
                {isSidebarOpen ? (
                    isOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16}/>
                ) : null}
            </>
        ):(
            <Link href={'/'} prefetch={false} className={clsx("flex items-center gap-2")}>
                <div className="flex items-center gap-2">
                    <IconBook size={20} />
                    {isSidebarOpen ? item.label : ''}
                </div>
            </Link>
        )}
        </>
    )    
}