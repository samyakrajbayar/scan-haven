import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface UploadScanDialogProps {
  onUpload: (name: string, imageUrl: string) => void;
}

export const UploadScanDialog = ({ onUpload }: UploadScanDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        if (!name) {
          setName(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && preview) {
      onUpload(name.trim(), preview);
      setName('');
      setPreview(null);
      setOpen(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setName('');
        setPreview(null);
      }
    }}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            className="gap-2 rounded-xl bg-accent font-body font-medium text-accent-foreground shadow-soft transition-shadow hover:bg-accent/90 hover:shadow-elevated"
          >
            <Upload className="h-5 w-5" />
            Upload Scan
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Upload Scan</DialogTitle>
            <DialogDescription className="font-body">
              Add a new scan to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            <div
              className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
                isDragging
                  ? 'border-accent bg-accent/5'
                  : preview
                  ? 'border-transparent'
                  : 'border-border hover:border-accent/50 hover:bg-muted/50'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => !preview && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full"
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      className="mx-auto max-h-[250px] rounded-lg object-contain"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-card/90 shadow-soft"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearPreview();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3 p-6 text-center"
                  >
                    <div className="rounded-full bg-muted p-4">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">
                        Drop your scan here
                      </p>
                      <p className="mt-1 font-body text-sm text-muted-foreground">
                        or click to browse
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scanName" className="font-body font-medium">
                Scan Name
              </Label>
              <Input
                id="scanName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Chapter 1 Notes"
                className="rounded-xl"
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
              disabled={!name.trim() || !preview}
              className="rounded-xl font-body"
            >
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
