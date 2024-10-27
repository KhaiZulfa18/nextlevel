"use server";
import prisma from "@/lib/prisma";

interface MonthlyUserCount {
    month: Date;
    user_count: number;
}

export async function getMonthlyUsers(): Promise<MonthlyUserCount> {

    const userPerMonth = await prisma.$queryRaw<MonthlyUserCount>`
        SELECT 
        DATE_TRUNC('month', "created_at") AS month, 
        COUNT(id)::int AS user_count
        FROM "User"
        GROUP BY month
        ORDER BY month ASC;
    `;

    return userPerMonth;
}