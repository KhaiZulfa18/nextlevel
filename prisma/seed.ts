// $ npx prisma db seed

const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    
    const userPromises = Array.from({ length: 25 }).map(async () => {
        const fullName = faker.person.fullName();
        const username = await createUsername(fullName);
        const password = await bcrypt.hash('nextlevel', 10);

        return await prisma.user.create({
            data: {
                username: username,
                name: fullName,
                email: faker.internet.email(),
                password: password
            },
        });
    });

    await Promise.all(userPromises);
    console.log('Seeded 25 random users');
}

export async function createUsername(name: string) {
    let username = name.toLowerCase();
    username = username.replace(/\s+/g, '');
    username = username.replace(/[^a-z0-9_]/g, '');

    let existingUser = await prisma.user.findFirst({
        where: { username },
    });

    const baseUsername = username;

    while (existingUser) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        username = `${baseUsername}${randomNumber}`;
        
        existingUser = await prisma.user.findFirst({
            where: { username },
        });
    }

    return username;
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});