import { motion } from 'framer-motion';
import { Scan } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Scan className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground">
            ScanVault
          </h1>
        </Link>
        <p className="hidden font-body text-sm text-muted-foreground sm:block">
          Your scans, beautifully organized
        </p>
      </div>
    </motion.header>
  );
};
