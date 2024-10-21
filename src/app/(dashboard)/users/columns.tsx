"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { IconDots, IconSelector, } from "@tabler/icons-react";

export type Users = {
    username: string,
    name: string,
    email: string | null,
}

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button variant={'ghost'}
                    className="w-full flex justify-between"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Username
                    <IconSelector size={16}/>
                </Button>
            )
        },
        size: 150
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant={'ghost'}
                    className="w-full flex justify-between"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name
                    <IconSelector size={16}/>
                </Button>
            )
        },
        size: 150
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => {

            const data = row.getValue<string | null>('email');

            if(!data)
                return null;

            const [name, domain] = data.split("@");
            const obfuscatedName = name[0] + "*".repeat(name.length - 2) + name[name.length -1];
            const obfuscatedEmail = `${obfuscatedName}@${domain}`;

            return <div className="text-left">{obfuscatedEmail}</div>;
        },
        size: 150
    },
    {
        id: "actions",
        cell: ({row}) => {
            const user = row.original
 
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                            <IconDots size={16}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.username)} >
                            Copy Username
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View User</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        enableHiding: false,
        size: 50
    }
]