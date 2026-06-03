import { motion, AnimatePresence } from 'framer-motion';
import { FiFile, FiImage, FiMusic, FiX, FiFileText, FiVideo } from 'react-icons/fi';

const FileList = ({ files, onRemove }) => {
  const getIcon = (file) => {
    if (file.type.startsWith('image')) return <FiImage className="text-green-500" />;
    if (file.type.startsWith('audio')) return <FiMusic className="text-purple-500" />;
    if (file.type.startsWith('video')) return <FiVideo className="text-red-500" />;
    if (file.type.includes('pdf') || file.type.includes('text')) return <FiFileText className="text-orange-500" />;
    return <FiFile className="text-blue-500" />;
  };

  return (
    <AnimatePresence>
      <div className="mt-6 space-y-2">
        {files.map((file, index) => (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-xl mr-3">{getIcon(file)}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(file)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <FiX className="text-gray-400 hover:text-red-500 transition-colors" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default FileList;