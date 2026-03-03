import { db } from '@/db';
import { links } from '@/db/schema';

const seedData = [
  {
    id: '1',
    shortCode: 'gh-repo',
    originalUrl: 'https://github.com/ramangrover/link-shortener',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
  {
    id: '2',
    shortCode: 'nextjs-docs',
    originalUrl: 'https://nextjs.org/docs/app/getting-started/installation',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
  {
    id: '3',
    shortCode: 'clerk-auth',
    originalUrl: 'https://clerk.com/docs/references/nextjs/auth-object',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
  {
    id: '4',
    shortCode: 'drizzle-orm',
    originalUrl: 'https://orm.drizzle.team/docs/get-started-postgresql',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
  {
    id: '5',
    shortCode: 'tw-tailwind',
    originalUrl: 'https://tailwindcss.com/docs/installation',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
  {
    id: '6',
    shortCode: 'shadcn-btn',
    originalUrl: 'https://ui.shadcn.com/docs/components/button',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
  {
    id: '7',
    shortCode: 'neon-db',
    originalUrl: 'https://neon.tech/docs/guides/auto-scaling',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
  {
    id: '8',
    shortCode: 'ts-strict',
    originalUrl: 'https://www.typescriptlang.org/tsconfig#strict',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
  {
    id: '9',
    shortCode: 'radix-ui',
    originalUrl:
      'https://www.radix-ui.com/docs/primitives/overview/introduction',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
  {
    id: '10',
    shortCode: 'pnpm-install',
    originalUrl: 'https://pnpm.io/installation',
    userId: 'user_3AKUAD2cXn8RiU17uio9ulWwPdN',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');

    for (const link of seedData) {
      await db.insert(links).values({
        id: link.id,
        shortCode: link.shortCode,
        originalUrl: link.originalUrl,
        userId: link.userId,
      });
      console.log(`✓ Inserted: ${link.shortCode} → ${link.originalUrl}`);
    }

    console.log(`\n✅ Successfully seeded ${seedData.length} links!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
