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
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={data} />
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    )
}