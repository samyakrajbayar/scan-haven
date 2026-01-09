import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Collection, Scan } from '@/types';

interface StoreState {
  collections: Collection[];
  addCollection: (name: string, description?: string) => void;
  deleteCollection: (id: string) => void;
  addScanToCollection: (collectionId: string, scan: Omit<Scan, 'id' | 'createdAt'>) => void;
  deleteScan: (collectionId: string, scanId: string) => void;
  updateCollectionCover: (collectionId: string, imageUrl: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      collections: [],
      
      addCollection: (name, description) => {
        const newCollection: Collection = {
          id: crypto.randomUUID(),
          name,
          description,
          scans: [],
          createdAt: new Date(),
        };
        set((state) => ({ collections: [...state.collections, newCollection] }));
      },
      
      deleteCollection: (id) => {
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        }));
      },
      
      addScanToCollection: (collectionId, scan) => {
        const newScan: Scan = {
          ...scan,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? {
                  ...c,
                  scans: [...c.scans, newScan],
                  coverImage: c.coverImage || scan.imageUrl,
                }
              : c
          ),
        }));
      },
      
      deleteScan: (collectionId, scanId) => {
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? { ...c, scans: c.scans.filter((s) => s.id !== scanId) }
              : c
          ),
        }));
      },
      
      updateCollectionCover: (collectionId, imageUrl) => {
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId ? { ...c, coverImage: imageUrl } : c
          ),
        }));
      },
    }),
    {
      name: 'scanvault-storage',
    }
  )
);
