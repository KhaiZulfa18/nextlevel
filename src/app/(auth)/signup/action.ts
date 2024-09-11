'use server';

import { revalidatePath } from "next/cache";

export async function createUser(prevState: FormData,formData: FormData): Promise<{ status: number, message: string }> {
    const rawFormData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirm_password') as string,
    }

    // Check if passwords match
    if (rawFormData.password !== rawFormData.confirmPassword) {
        return { status: 400, message: 'Passwords do not match' };
    }

    // Handle signup logic (e.g., database operations) here

    return { status: 201, message: 'User created successfully' };
}
