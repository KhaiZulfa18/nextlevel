import prisma from "@/lib/prisma";

export async function getMonthlyUsers() {

    const userPerMonth = await prisma.$queryRaw`
        SELECT 
        DATE_TRUNC('month', "created_at") AS month, 
        COUNT(id) AS user_count
        FROM "User"
        GROUP BY month
        ORDER BY month ASC;
    `;

    return userPerMonth;
}