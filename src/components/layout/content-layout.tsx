import NavbarDashboard from "./navbar-dashboard";

export default function ContentLayout({children}: {children: React.ReactNode}) {

    return (
        <div>
            <NavbarDashboard/>
            <div className="w-full min-h-screen bg-zinc-50 dark:bg-background  px-10 py-5">
                {children}
            </div>
        </div>
    )
}