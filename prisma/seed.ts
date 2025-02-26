import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@example.com',
      timezone: 'America/Argentina/Buenos_Aires',
    },
    {
      name: 'Jane',
      surname: 'Smith',
      email: 'janesmith@example.com',
      timezone: 'America/New_York',
    },
    {
      name: 'Michael',
      surname: 'Brown',
      email: 'michaelbrown@example.com',
      timezone: 'America/Toronto',
    },
    {
      name: 'Emily',
      surname: 'Clark',
      email: 'emilyclark@example.com',
      timezone: 'Europe/London',
    },
    {
      name: 'David',
      surname: 'Johnson',
      email: 'davidjohnson@example.com',
      timezone: 'Asia/Tokyo',
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
