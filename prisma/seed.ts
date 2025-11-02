import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

async function main() {
  console.log('Start seeding...');

  const usd = await prisma.currency.upsert({
    where: { code: 'USD' },
    update: {},
    create: {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
    },
  });

  const eur = await prisma.currency.upsert({
    where: { code: 'EUR' },
    update: {},
    create: {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
    },
  });

  const salary = await prisma.category.create({
    data: { name: 'Salary' },
  });

  const groceries = await prisma.category.create({
    data: { name: 'Groceries' },
  });

  const transport = await prisma.category.create({
    data: { name: 'Transport' },
  });

  const entertainment = await prisma.category.create({
    data: { name: 'Entertainment' },
  });

  const utilities = await prisma.category.create({
    data: { name: 'Utilities' },
  });

  const healthcare = await prisma.category.create({
    data: { name: 'Healthcare' },
  });

  const shopping = await prisma.category.create({
    data: { name: 'Shopping' },
  });

  const hashedPassword = await bcrypt.hash('password123', 10);

  const john = await prisma.user.create({
    data: {
      password: hashedPassword,
      email: 'john@gmail.com',
      name: 'John Doe',
      defaultCurrencyId: usd.id,
    },
  });

  const jane = await prisma.user.create({
    data: {
      password: hashedPassword,
      email: 'jane@gmail.com',
      name: 'Jane Smith',
      defaultCurrencyId: eur.id,
    },
  });

  await prisma.record.createMany({
    data: [
      {
        userId: john.id,
        categoryId: salary.id,
        currencyId: usd.id,
        amount: 5000,
      },
      {
        userId: john.id,
        categoryId: groceries.id,
        currencyId: usd.id,
        amount: 150.5,
      },
      {
        userId: john.id,
        categoryId: transport.id,
        currencyId: eur.id,
        amount: 45.2,
      },
      {
        userId: john.id,
        categoryId: entertainment.id,
        currencyId: usd.id,
        amount: 80,
      },
      {
        userId: john.id,
        categoryId: utilities.id,
        currencyId: eur.id,
        amount: 120.75,
      },
    ],
  });

  await prisma.record.createMany({
    data: [
      {
        userId: jane.id,
        categoryId: salary.id,
        currencyId: eur.id,
        amount: 4200,
      },
      {
        userId: jane.id,
        categoryId: groceries.id,
        currencyId: eur.id,
        amount: 180.3,
      },
      {
        userId: jane.id,
        categoryId: healthcare.id,
        currencyId: eur.id,
        amount: 65,
      },
      {
        userId: jane.id,
        categoryId: shopping.id,
        currencyId: usd.id,
        amount: 250,
      },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
