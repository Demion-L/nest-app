import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await prisma.flowers.deleteMany();

  await prisma.flowers.createMany({
    data: [
      { name: 'Rose', color: 'Red', price: 10.5 },
      { name: 'Tulip', color: 'Yellow', price: 7.0 },
      { name: 'Orchid', color: 'Purple', price: 20.0 },
      { name: 'Daisy', color: 'White', price: 5.0 },
      { name: 'Sunflower', color: 'Yellow', price: 8.0 },
    ],
  });

  console.log('Database seeded!');
}

main()
  .catch(console.error)
  .finally(() => {
    void prisma.$disconnect();
  });
