import ContentLayout from "@/components/layout/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthlyUsers } from "./action";

export default async function Dashboard({}) {

    const monthlyUsers = await getMonthlyUsers();
    
    return (
        <ContentLayout>
            <Card className="w-1/2">
                <CardHeader>
                <CardTitle>Bar Chart</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="px-3 py-3 md:px-6 md:py-3">
                    
                </CardContent>
            </Card>
        </ContentLayout>
    )
}