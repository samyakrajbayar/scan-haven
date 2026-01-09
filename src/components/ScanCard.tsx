import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, ZoomIn } from 'lucide-react';
import { Scan } from '@/types';
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

interface ScanCardProps {
  scan: Scan;
  index: number;
  onDelete: (id: string) => void;
}

export const ScanCard = ({ scan, index, onDelete }: ScanCardProps) => {
  const [isViewing, setIsViewing] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -4 }}
        className="group relative"
      >
        <div
          className="relative cursor-pointer overflow-hidden rounded-xl bg-card shadow-soft transition-shadow duration-300 hover:shadow-hover"
          onClick={() => setIsViewing(true)}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={scan.imageUrl}
              alt={scan.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10">
            <ZoomIn className="h-8 w-8 text-card opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="p-3">
            <p className="truncate font-body text-sm font-medium text-foreground">
              {scan.name}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              {new Date(scan.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
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
              <AlertDialogTitle className="font-display">Delete Scan</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{scan.name}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(scan.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>

      <AnimatePresence>
        {isViewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
            onClick={() => setIsViewing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-card shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 z-10 h-10 w-10 rounded-full bg-card/90 shadow-soft backdrop-blur-sm"
                onClick={() => setIsViewing(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              <img
                src={scan.imageUrl}
                alt={scan.name}
                className="max-h-[85vh] w-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
                <p className="font-display text-lg font-semibold text-card">{scan.name}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
