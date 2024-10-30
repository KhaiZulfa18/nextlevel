import clsx from "clsx";
import NavbarDashboard from "./navbar-dashboard";

export default function ContentLayout({children}: {children: React.ReactNode}) {

    return (
        <div>
            <NavbarDashboard/>
            <div className={clsx('w-full min-h-screen bg-border dark:bg-secondary px-1 py-2 md:px-10 md:py-5')}>
                {children}
            </div>
        </div>
    )
}