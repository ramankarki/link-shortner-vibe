import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: text('id').primaryKey(),
  shortCode: varchar('short_code', { length: 20 }).notNull().unique(),
  originalUrl: text('original_url').notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
