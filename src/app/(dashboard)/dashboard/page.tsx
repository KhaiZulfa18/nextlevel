import ContentLayout from "@/components/layout/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthlyUsers } from "./action";
import { UsersChart } from "./user-chart"; 

export default async function Dashboard({}) {

    const monthlyUsers = await getMonthlyUsers();
    
    return (
        <ContentLayout>
            <Card className="w-full md:w-1/2">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
                    <CardDescription className="text-sm text-gray-500">Monthly user registration</CardDescription>
                </CardHeader>
                <CardContent className="px-3 py-3 md:px-6 md:py-3">
                    <UsersChart data={monthlyUsers}/>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}