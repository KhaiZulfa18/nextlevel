import ContentLayout from "@/components/layout/content-layout";
import { DataTable } from "./data-table";
import { Users, columns } from "./columns";
import { getAllUsers } from "./action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UsersPage({}) {

    const data = await getAllUsers();

    return (
        <ContentLayout>
            <div className="flex flex-col gap-3">
                <Card className="w-full bg-background">
                    <CardHeader className="px-3 pt-6 pb-2 md:px-6 md:pt-6 md:pb-3">
                        <CardTitle>Users</CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 py-3 md:px-6 md:py-3">
                        <DataTable columns={columns} data={data} />
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    )
}