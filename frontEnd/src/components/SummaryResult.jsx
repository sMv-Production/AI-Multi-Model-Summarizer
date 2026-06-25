import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiCopy, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

const SummaryResult = ({ summary }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!summary) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      // Light Theme Makeover: Clean slate foundation with standard soft shadows instead of custom neon blooms
      className="bg-slate-100/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-slate-300 mt-8 text-left max-w-4xl mx-auto"
    >
      {/* Header Panel */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-300">
        <div className="flex items-center gap-2.5">
          <FiCheckCircle className="text-teal-600 text-xl" />
          <h3 className="text-lg font-bold text-slate-800 tracking-wide">Summary Result</h3>
        </div>
        
        {/* Copy Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          // Upgraded button styling to leverage clean light backgrounds with high-contrast text tones
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 min-w-[95px] justify-center outline-none border
            ${copied 
              ? 'bg-teal-50 text-teal-700 border-teal-300 shadow-sm' 
              : 'text-slate-600 border-slate-300 bg-slate-50 hover:bg-slate-200 hover:text-cyan-700 hover:border-cyan-400'
            }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? 'copied' : 'copy'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <FiCheck className="text-sm stroke-[3]" />
                  Copied!
                </>
              ) : (
                <>
                  <FiCopy className="text-xs" />
                  Copy
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Structured Content Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-inner"
      >
        {/* Deepened text tone to slate-700 to provide a perfectly accessible, highly legible reading environment */}
        <p className="text-slate-700 font-medium leading-relaxed text-sm sm:text-base tracking-wide whitespace-pre-line">
          {summary}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SummaryResult;