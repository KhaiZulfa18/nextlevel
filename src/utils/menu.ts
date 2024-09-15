export interface MenuItem {
    label: string;
    icon?: string; // Optional, you can remove if not needed
    path?: string;
    children?: MenuItem[]; // Optional if you have sub-menus
}

export const menuItems: MenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'dashboard-icon',
        path: '/dashboard',
    },
    {
        label: 'Users',
        icon: 'users-icon',
        path: '/users',
    },
    {
        label: 'Settings',
        icon: 'settings-icon',
        children: [
            {
                label: 'Profile',
                path: '/settings/profile',
            },
            {
                label: 'Account',
                path: '/settings/account',
            },
        ],
    },
  ];