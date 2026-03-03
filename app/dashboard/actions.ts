'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createLinkInDb } from '@/data/links';

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const createLinkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  shortCode: z
    .string()
    .min(1, 'Short code is required')
    .max(20, 'Short code must be less than 20 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Short code can only contain letters, numbers, hyphens, and underscores',
    )
    .optional(),
});

export async function createLink(data: unknown): Promise<ActionResult<Link>> {
  try {
    // Validate input
    const validation = createLinkSchema.safeParse(data);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(errors)[0]?.[0] || 'Invalid input';
      return { success: false, error: firstErrorMessage };
    }

    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const { originalUrl, shortCode } = validation.data;

    // Create the link in database
    await createLinkInDb(userId, originalUrl, shortCode);

    // Revalidate the dashboard page to refresh the links list
    revalidatePath('/dashboard');

    // Note: In a real scenario, you'd fetch the created record and return it
    // For now, we'll return a success response
    return {
      success: true,
      data: {
        id: '', // Would be populated from DB response
        shortCode: shortCode || '',
        originalUrl,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  } catch (error) {
    console.error('Error creating link:', error);
    return { success: false, error: 'Failed to create link' };
  }
}
