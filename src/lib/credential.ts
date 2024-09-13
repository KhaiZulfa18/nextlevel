'use server';

import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

const prisma = new PrismaClient();

export async function signIn(prevState: FormData, formData: FormData): Promise<any> {
    
    const rawFormData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const hashedPassword = await bcrypt.hash(rawFormData.password, 10);

    const user = await prisma.user.findFirst({
        where: { 
            email: rawFormData.email,
        },
    });

    const userPassword = user?.password;

    if(!user || !userPassword || !(await bcrypt.compare(rawFormData.password, userPassword))) {
        return { status: 400, message: 'Invalid email or password.' };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    redirect('/', RedirectType.push);
}