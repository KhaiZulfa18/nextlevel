"use server"

import prisma from "@/lib/prisma";

export async function getAllUsers() {

    const users = await prisma.user.findMany({
        select: {
            username: true,
            name: true,
            email: true,     
        }
    });

    return users;
} 