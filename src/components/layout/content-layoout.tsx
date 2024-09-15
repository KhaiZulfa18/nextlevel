import NavbarDashboard from "./navbar-dashboard";

export default function ContentLayout({children}: {children: React.ReactNode}) {

    return (
        <div>
            <NavbarDashboard/>
            {children}
        </div>
    )
}