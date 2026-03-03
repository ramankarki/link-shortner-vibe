'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { updateLink } from './actions';

interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
}

interface EditLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: Link | null;
  onSuccess?: () => void;
}

export function EditLinkModal({
  open,
  onOpenChange,
  link,
  onSuccess,
}: EditLinkModalProps) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Reset form when link changes
  useEffect(() => {
    if (link) {
      setOriginalUrl(link.originalUrl);
      setShortCode(link.shortCode);
      setError(null);
      setSuccess(false);
    }
  }, [link]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link) return;

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const result = await updateLink({
        id: link.id,
        originalUrl,
        shortCode,
      });

      if (result.success) {
        setSuccess(true);

        // Close dialog after success
        setTimeout(() => {
          onOpenChange(false);
          onSuccess?.();
        }, 1500);
      } else {
        setError(result.error || 'Failed to update link');
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
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update the URL and short code for your link.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-original-url">Original URL</Label>
            <Input
              id="edit-original-url"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              disabled={loading || success}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-short-code">Short Code</Label>
            <Input
              id="edit-short-code"
              type="text"
              placeholder="my-link"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              disabled={loading || success}
              required
            />
          </div>

          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded bg-green-50 p-3 text-sm text-green-600">
              Link updated successfully!
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading || success}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || success}>
              {loading ? 'Updating...' : 'Update Link'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
