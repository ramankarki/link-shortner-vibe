import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserLinks } from '@/data/links';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const userLinks = await getUserLinks(userId);

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Links</h1>
        <p className="text-gray-600">Manage and track your shortened URLs</p>
      </div>

      {userLinks.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">
            No links yet. Create your first shortened URL!
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {userLinks.map((link) => (
            <Card key={link.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-mono font-semibold">
                      {link.shortCode}
                    </code>
                    <Badge variant="outline">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-gray-700 break-all text-sm">
                    {link.originalUrl}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
