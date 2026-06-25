import { motion, AnimatePresence } from 'framer-motion';
import { FiFile, FiImage, FiMusic, FiX, FiFileText, FiVideo } from 'react-icons/fi';

const FileList = ({ files, onRemove }) => {
  const getIcon = (file) => {
    // Light Theme: Swapped out neon drop-shadows for deep, vibrant, accessible light-mode icon colors
    if (file.type.startsWith('image/')) return <FiImage className="text-teal-600" />;
    if (file.type.startsWith('audio/')) return <FiMusic className="text-cyan-600" />;
    if (file.type.startsWith('video/')) return <FiVideo className="text-rose-600" />;
    if (file.type.includes('pdf') || file.type.includes('text')) return <FiFileText className="text-emerald-600" />;
    return <FiFile className="text-sky-600" />;
  };

  const formatSize = (bytes) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="mt-4 space-y-3">
      <AnimatePresence mode="popLayout">
        {files.map((file, index) => {
          const uniqueKey = `${file.name}-${file.size}-${file.lastModified || index}`;

          return (
            <motion.div
              key={uniqueKey}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              layout
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30,
                opacity: { duration: 0.2 } 
              }}
              // Light Theme Makeover: Clean slate-50 container, explicit border, and a subtle light hover shadow
              className="flex items-center p-3.5 bg-slate-50 border border-slate-300 rounded-xl hover:border-cyan-500 hover:shadow-md transition-all duration-300"
            >
              <div className="text-xl mr-3.5 flex items-center justify-center">
                {getIcon(file)}
              </div>
              
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-slate-800 truncate max-w-[180px] sm:max-w-xs tracking-wide">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  {formatSize(file.size)}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onRemove(file)}
                className="p-1.5 hover:bg-rose-50 rounded-lg group/btn transition-colors"
              >
                <FiX className="text-slate-400 group-hover/btn:text-rose-600 transition-colors" />
              </motion.button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default FileList;