import { db } from '@/db';
import { links } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function getUserLinks(userId: string) {
  return db.query.links.findMany({
    where: eq(links.userId, userId),
    orderBy: (links, { desc }) => [desc(links.createdAt)],
  });
}

export async function createLinkInDb(
  userId: string,
  originalUrl: string,
  shortCode?: string,
) {
  const code = shortCode || nanoid(8);

  return db.insert(links).values({
    id: nanoid(),
    shortCode: code,
    originalUrl,
    userId,
  });
}
