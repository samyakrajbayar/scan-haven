import { motion } from 'framer-motion';
import { Folder, Image, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collection } from '@/types';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface CollectionCardProps {
  collection: Collection;
  index: number;
  onDelete: (id: string) => void;
}

export const CollectionCard = ({ collection, index, onDelete }: CollectionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link to={`/collection/${collection.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary shadow-soft transition-shadow duration-300 group-hover:shadow-hover">
          {collection.coverImage ? (
            <img
              src={collection.coverImage}
              alt={collection.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted">
              <Folder className="h-16 w-16 text-muted-foreground/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-display text-xl font-semibold text-card">
              {collection.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-card/80">
              <Image className="h-3.5 w-3.5" />
              <span className="font-body text-sm">
                {collection.scans.length} {collection.scans.length === 1 ? 'scan' : 'scans'}
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-card/90 opacity-0 shadow-soft backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Delete Collection</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{collection.name}"? This will permanently remove all {collection.scans.length} scans in this collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(collection.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};
