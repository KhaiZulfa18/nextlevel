import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useState } from "react";
import { IconBook, IconChevronDown, IconChevronRight } from "@tabler/icons-react";

export default function MenuItems({item}: {item: any}) {

    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        // <div className="hidden md:flex items-center gap-2">
        //     {items.map((item: any) => (
        //         <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary" prefetch={false}>
        //             {item.name}
        //         </Link>
        //     ))}
        // </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center w-full p-2 hover:bg-accent rounded-md">
                {hasChildren ? (
                    isOpen ? <IconChevronDown size={16} /> : <IconChevronRight className="h-4 w-4 mr-2" />
                ) : (
                    <IconBook size={16}/>
                )}
                {item.label}
            </CollapsibleTrigger>
            {hasChildren && (
                <CollapsibleContent className="ml-4">
                    {item.label}
                </CollapsibleContent>
            )}
        </Collapsible>
    )
}