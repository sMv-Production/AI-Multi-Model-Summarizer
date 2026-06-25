import { motion, AnimatePresence } from 'framer-motion';
import { FiType, FiCheck } from 'react-icons/fi';

const TextInput = ({ text, onTextChange, disabled }) => {
  const getWordCount = (str) => {
    const trimmed = str.trim();
    return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  };

  const wordCount = getWordCount(text);
  const MIN_WORDS = 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-left"
    >
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={disabled ? 'Text input is disabled' : 'Enter or paste your text here...'}
          disabled={disabled}
          // Light Theme: Clean, high-contrast text layout container with smooth slate borders
          className={`w-full min-h-[200px] p-4 rounded-xl border transition-all duration-300 text-slate-800 font-medium leading-relaxed placeholder-slate-400 shadow-inner resize-none focus:outline-none 
            ${disabled
              ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed text-slate-400'
              : 'bg-slate-50 border-slate-300 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600'
            }`}
        />

        {/* Counter Badge: Crisp light floating badge structure without glowing offsets */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-bold tracking-wide px-2.5 py-1 rounded-lg bg-slate-100/90 backdrop-blur-md border border-slate-300 shadow-sm">
          <FiType className="text-slate-500" />
          <span className={wordCount >= MIN_WORDS ? 'text-teal-700' : 'text-slate-600'}>
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
          {wordCount >= MIN_WORDS && <FiCheck className="text-teal-600 stroke-[3]" />}
        </div>
      </div>

      {/* Info Message Row */}
      <div className="min-h-[24px] mt-2.5 px-1">
        <AnimatePresence mode="wait">
          {disabled ? (
            <motion.p key="disabled" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-slate-500 italic tracking-wide">
              Remove files to enable text input
            </motion.p>
          ) : (
            <motion.p key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs font-bold tracking-wide text-slate-500">
              {wordCount > 0 && wordCount < MIN_WORDS
                ? `Enter at least ${MIN_WORDS} words to summarize`
                : 'Paste or type your text to begin'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TextInput;