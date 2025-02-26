import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Nico',
      surname: 'Joaquin',
      email: 'nicojoaquin1998@gmail.com',
      timezone: 'America/Argentina/Buenos_Aires',
    },
    {
      name: 'Nico',
      surname: 'Joaquin',
      email: 'nicojoaquin1998@gmail.com',
      timezone: 'America/New_York',
    },
    {
      name: 'Nico',
      surname: 'Joaquin',
      email: 'nicojoaquin1998@gmail.com',
      timezone: 'America/Toronto',
    },
    {
      name: 'Nico',
      surname: 'Joaquin',
      email: 'nicojoaquin1998@gmail.com',
      timezone: 'Europe/London',
    },
    {
      name: 'Nico',
      surname: 'Joaquin',
      email: 'nicojoaquin1998@gmail.com',
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
