import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreateCollectionDialogProps {
  onCreateCollection: (name: string, description?: string) => void;
}

export const CreateCollectionDialog = ({ onCreateCollection }: CreateCollectionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateCollection(name.trim(), description.trim() || undefined);
      setName('');
      setDescription('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            className="gap-2 rounded-xl bg-primary font-body font-medium shadow-soft transition-shadow hover:shadow-elevated"
          >
            <Plus className="h-5 w-5" />
            New Collection
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Create Collection</DialogTitle>
            <DialogDescription className="font-body">
              Give your collection a name and optional description.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-body font-medium">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Physics Notes, Art Sketches"
                className="rounded-xl"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="font-body font-medium">
                Description (optional)
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's in this collection?"
                className="min-h-[80px] resize-none rounded-xl"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim()}
              className="rounded-xl font-body"
            >
              Create Collection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
