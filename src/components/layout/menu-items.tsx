import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useState } from "react";
import { IconBook, IconChevronDown, IconChevronRight } from "@tabler/icons-react";

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
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center w-full p-2 text-sm hover:bg-accent rounded-md justify-between">
                {hasChildren ? (
                    <>
                        <div className="flex items-center gap-2">
                            <IconBook size={16}/>
                            {item.label}
                        </div>
                        {isOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16}/>}
                    </>
                ) : (
                    <Link href={item.path} prefetch={false} className="flex items-center gap-2">
                        <IconBook size={16}/>
                        {item.label}
                    </Link>
                )}
            </CollapsibleTrigger>
            {hasChildren && (
                <CollapsibleContent className="border-l pl-4" asChild>
                    <div className="flex flex-col">
                        {item.children.map((child: any, index: number) => (
                            <MenuItemList key={index} item={child} index={index}/>
                        ))}
                    </div>
                </CollapsibleContent>
            )}
        </Collapsible>
    )
}

const MenuItemList = ({item, index}: {item: any, index: number}) => {
    return (
        <CollapsibleContent key={index} className="flex items-center w-full p-2 text-sm hover:bg-accent justify-between rounded-md" asChild>
            <Link key={index} href={item.path} prefetch={false} className="">{item.label}</Link>
        </CollapsibleContent>
    )
}