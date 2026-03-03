'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreateLinkModal } from './create-link-modal';
import { EditLinkModal } from './edit-link-modal';
import { DeleteLinkDialog } from './delete-link-dialog';

interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardContentProps {
  userLinks: Link[];
  onLinksChange?: () => void;
}

export function DashboardContent({
  userLinks: initialLinks,
  onLinksChange,
}: DashboardContentProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);

  const handleSuccess = () => {
    // Trigger a refresh of the links
    onLinksChange?.();
  };

  const handleEdit = (link: Link) => {
    setSelectedLink(link);
    setEditOpen(true);
  };

  const handleDelete = (link: Link) => {
    setSelectedLink(link);
    setDeleteOpen(true);
  };

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Links</h1>
          <p className="text-gray-600">Manage and track your shortened URLs</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} size="lg">
          Create Link
        </Button>
      </div>

      {initialLinks.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">
            No links yet. Create your first shortened URL!
          </p>
          <Button onClick={() => setCreateOpen(true)}>
            Create Your First Link
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {initialLinks.map((link) => (
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
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(link)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(link)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateLinkModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={handleSuccess}
      />

      <EditLinkModal
        open={editOpen}
        onOpenChange={setEditOpen}
        link={selectedLink}
        onSuccess={handleSuccess}
      />

      <DeleteLinkDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        linkId={selectedLink?.id || null}
        shortCode={selectedLink?.shortCode || null}
        onSuccess={handleSuccess}
      />
    </main>
  );
}
