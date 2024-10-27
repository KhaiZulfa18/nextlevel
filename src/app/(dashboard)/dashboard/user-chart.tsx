"use client";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const UsersChart = ({data}:{data:any}) => {

    const chartConfig = {
        user_count: {
          label: "user count",
          color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig
    
    return (
        <ChartContainer config={chartConfig} >
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => new Date(value).toLocaleString("en-US", { month: "short" })} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="user_count" fill="var(--color-user_count)" radius={8} />
            </BarChart>
        </ChartContainer>
    )
}