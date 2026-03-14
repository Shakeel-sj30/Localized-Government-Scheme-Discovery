import { PrismaClient } from '@prisma/client';
import { schemes } from '../src/data/schemes';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding schemes...');
  
  // Clear existing schemes
  await prisma.scheme.deleteMany({});
  
  let count = 0;
  for (const scheme of schemes) {
    try {
      await prisma.scheme.create({
        data: {
          id: scheme.id,
          category: scheme.category,
          title: JSON.stringify(scheme.title),
          shortDescription: JSON.stringify(scheme.shortDescription),
          longDescription: JSON.stringify(scheme.longDescription),
          benefitsAmount: JSON.stringify(scheme.benefitsAmount),
          eligibility: JSON.stringify(scheme.eligibility),
          requiredDocuments: JSON.stringify(scheme.requiredDocuments),
          applicationUrl: scheme.applicationUrl,
          startDate: scheme.startDate || null,
          endDate: scheme.endDate || null,
          status: scheme.status,
          launchedBy: scheme.launchedBy || null,
        }
      });
      count++;
    } catch (error) {
       console.error(`Failed to seed scheme ${scheme.id}:`, error);
    }
  }
  
  console.log(`Seeded ${count} schemes successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
