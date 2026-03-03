'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { deleteLink } from './actions';

interface DeleteLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linkId: string | null;
  shortCode: string | null;
  onSuccess?: () => void;
}

export function DeleteLinkDialog({
  open,
  onOpenChange,
  linkId,
  shortCode,
  onSuccess,
}: DeleteLinkDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!linkId) return;

    setError(null);
    setLoading(true);

    try {
      const result = await deleteLink({ id: linkId });

      if (result.success) {
        onOpenChange(false);
        onSuccess?.();
      } else {
        setError(result.error || 'Failed to delete link');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the link{' '}
            <code className="bg-gray-900 text-white px-2 py-1 rounded text-sm font-mono">
              {shortCode}
            </code>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Link'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
