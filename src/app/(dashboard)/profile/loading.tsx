import ContentLayout from "@/components/layout/content-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

    return (
        <ContentLayout>
            <div className="flex flex-col space-y-3 w-full">
                <Skeleton className="h-[150px] w-full rounded-xl" />
                <Skeleton className="h-[150px] w-full rounded-xl" />
                <Skeleton className="h-[150px] w-2/3 rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-1/4" />
                </div>
            </div>
        </ContentLayout>
    )
}