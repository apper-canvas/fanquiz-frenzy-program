import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const AlertTriangle = getIcon('alert-triangle');

const NotFound = () => {
  return (
    <motion.div 
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-red-100 dark:bg-red-900/20 p-5 rounded-full mb-6">
        <AlertTriangle className="h-16 w-16 text-red-500" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Page Not Found
      </h2>
      
      <p className="text-surface-600 dark:text-surface-300 text-center max-w-md mb-8">
        Oops! The page you're looking for doesn't seem to exist. It might have moved 
        or been deleted.
      </p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Homepage
        </Link>
      </motion.div>
      
      <div className="mt-12 text-sm text-surface-500 dark:text-surface-400">
        If you think this is an error, please contact support.
      </div>
    </motion.div>
  );
};

export default NotFound;