import { getLinkByShortCode } from '@/data/links';
import { redirect } from 'next/navigation';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;

  const link = await getLinkByShortCode(shortcode);

  if (!link) {
    return new Response('Link not found', { status: 404 });
  }

  redirect(link.originalUrl);
}
