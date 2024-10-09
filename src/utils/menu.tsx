"use client";
import { IconDashboard, IconUsers, IconSettings } from "@tabler/icons-react"; // Adjust this import based on your icon library
import { usePathname } from 'next/navigation'

export interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    path?: string;
    active?: boolean;
    children?: MenuItem[];
}

export const useMenuItems = (): MenuItem[] => {
    const urlPathname = usePathname();

    const menuItems: MenuItem[] = [
        {
            label: 'Dashboard',
            icon: <IconDashboard size={20} />,
            path: '/dashboard',
        },
        {
            label: 'Users',
            icon: <IconUsers size={20} />,
            path: '/users',
        },
        {
            label: 'Settings',
            icon: <IconSettings size={20} />,
            children: [
                {
                    label: 'Profile',
                    path: '/profile',
                },
            ],
        },
    ];

    const checkActive = (path?: string): boolean => {
        return path ? urlPathname.startsWith(path) : false;
    };

    return menuItems.map((item) => ({
        ...item,
        active: checkActive(item.path),
        children: item.children?.map((child) => ({
            ...child,
            active: checkActive(child.path),
        })),
    }));
};
