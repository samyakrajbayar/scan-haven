import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6 rounded-full bg-muted p-6"
      >
        <Icon className="h-12 w-12 text-muted-foreground" />
      </motion.div>
      <h3 className="mb-2 font-display text-2xl font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-sm font-body text-muted-foreground">{description}</p>
      {action}
    </motion.div>
  );
};
