import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import { Header } from '@/components/Header';
import { CollectionCard } from '@/components/CollectionCard';
import { CreateCollectionDialog } from '@/components/CreateCollectionDialog';
import { EmptyState } from '@/components/EmptyState';
import { useStore } from '@/store/useStore';

const Index = () => {
  const { collections, addCollection, deleteCollection } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Your Collections
            </h2>
            <p className="mt-1 font-body text-muted-foreground">
              {collections.length === 0
                ? 'Start by creating your first collection'
                : `${collections.length} ${collections.length === 1 ? 'collection' : 'collections'}`}
            </p>
          </div>
          <CreateCollectionDialog onCreateCollection={addCollection} />
        </motion.div>

        {collections.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No collections yet"
            description="Create your first collection to start organizing your scans. You can group notes by subject, project, or however you like."
            action={<CreateCollectionDialog onCreateCollection={addCollection} />}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {collections.map((collection, index) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                index={index}
                onDelete={deleteCollection}
              />
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;
