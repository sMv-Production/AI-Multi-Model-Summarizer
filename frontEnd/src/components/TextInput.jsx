import { motion } from 'framer-motion';
import { FiType } from 'react-icons/fi';

const TextInput = ({ text, onTextChange, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={disabled ? 'Text input is disabled' : 'Enter or paste your text here...'}
          disabled={disabled}
          className={`w-full min-h-[200px] p-4 rounded-lg
            border-[1px] border-gray-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            placeholder-gray-400 resize-none transition-all duration-200
            ${disabled 
              ? 'bg-gray-50 cursor-not-allowed' 
              : 'bg-gray-50 hover:bg-white focus:bg-white'
            }
            text-gray-700 leading-relaxed shadow-sm`}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-3 right-3 flex items-center gap-2 text-gray-400"
        >
          <FiType className="text-lg" />
        </motion.div>
      </div>
      <p className="mt-2 text-sm text-gray-500 italic">
        {disabled 
          ? 'Remove files to enable text input'
          : 'Tip: You can paste your text directly or type it here'
        }
      </p>
    </motion.div>
  );
};

export default TextInput;