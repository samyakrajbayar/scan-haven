import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileImage, Image } from 'lucide-react';
import { Header } from '@/components/Header';
import { ScanCard } from '@/components/ScanCard';
import { UploadScanDialog } from '@/components/UploadScanDialog';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';

const CollectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { collections, addScanToCollection, deleteScan } = useStore();

  const collection = collections.find((c) => c.id === id);

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <EmptyState
            icon={FileImage}
            title="Collection not found"
            description="This collection doesn't exist or has been deleted."
            action={
              <Button onClick={() => navigate('/')} className="rounded-xl">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Collections
              </Button>
            }
          />
        </main>
      </div>
    );
  }

  const handleUpload = (name: string, imageUrl: string) => {
    addScanToCollection(collection.id, { name, imageUrl });
  };

  const handleDeleteScan = (scanId: string) => {
    deleteScan(collection.id, scanId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 font-body text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collections
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              {collection.name}
            </h2>
            {collection.description && (
              <p className="mt-1 font-body text-muted-foreground">
                {collection.description}
              </p>
            )}
            <p className="mt-2 font-body text-sm text-muted-foreground">
              {collection.scans.length} {collection.scans.length === 1 ? 'scan' : 'scans'}
            </p>
          </div>
          <UploadScanDialog onUpload={handleUpload} />
        </motion.div>

        {collection.scans.length === 0 ? (
          <EmptyState
            icon={Image}
            title="No scans yet"
            description="Upload your first scan to this collection. You can drag and drop images or click to browse."
            action={<UploadScanDialog onUpload={handleUpload} />}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {collection.scans.map((scan, index) => (
              <ScanCard
                key={scan.id}
                scan={scan}
                index={index}
                onDelete={handleDeleteScan}
              />
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default CollectionPage;
