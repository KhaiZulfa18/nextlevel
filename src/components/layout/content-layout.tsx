import NavbarDashboard from "./navbar-dashboard";

export default function ContentLayout({children}: {children: React.ReactNode}) {

    return (
        <div>
            <NavbarDashboard/>
            <div className="w-full min-h-screen bg-zinc-50 dark:bg-slate-950 px-1 py-2 md:px-10 md:py-5">
                {children}
            </div>
        </div>
    )
}