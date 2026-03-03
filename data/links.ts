import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
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

export async function updateLinkInDb(
  linkId: string,
  userId: string,
  originalUrl: string,
  shortCode: string,
) {
  return db
    .update(links)
    .set({
      originalUrl,
      shortCode,
      updatedAt: new Date(),
    })
    .where(and(eq(links.id, linkId), eq(links.userId, userId)));
}

export async function deleteLinkInDb(linkId: string, userId: string) {
  return db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)));
}
