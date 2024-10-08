import { IconDashboard, IconUsers, IconSettings } from "@tabler/icons-react"; // Adjust this import based on your icon library

export interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    path?: string;
    children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
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
