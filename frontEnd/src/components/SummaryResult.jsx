import { motion } from 'framer-motion';
import { FiCheckCircle, FiCopy } from 'react-icons/fi';
import { useState } from 'react';

const SummaryResult = ({ summary }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!summary) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-6 shadow-lg mt-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FiCheckCircle className="text-green-500 text-xl mr-2" />
          <h3 className="text-xl font-semibold">Summary Result</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100"
        >
          <FiCopy />
          {copied ? 'Copied!' : 'Copy'}
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-50 p-4 rounded-lg"
      >
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </motion.div>
    </motion.div>
  );
};

export default SummaryResult;