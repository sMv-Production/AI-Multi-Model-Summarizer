import { motion } from 'framer-motion';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] bg-slate-100 text-slate-900 antialiased flex flex-col items-center justify-center">
      <main className="container mx-auto max-w-md px-6 text-center space-y-8">
        
        {/* Animated Error Emblem Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 15 
          }}
          className="relative inline-flex items-center justify-center w-20 h-20 bg-rose-50 border border-rose-300 rounded-2xl shadow-sm mx-auto"
        >
          <FiAlertTriangle className="text-3xl text-rose-600" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
          </span>
        </motion.div>

        {/* Text Messaging Panel */}
        <div className="space-y-3">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black text-slate-800 tracking-tight"
          >
            404
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-bold text-slate-700 tracking-wide"
          >
            Page Not Found
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-medium text-slate-500 max-w-xs mx-auto leading-relaxed"
          >
            The path you are looking for does not exist, has been removed, or was redirected to a different pipeline address.
          </motion.p>
        </div>

        {/* Home Routing Trigger Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-2"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-transform active:scale-95 shadow-md hover:shadow-lg"
          >
            <FiHome className="text-base" />
            <span className="tracking-wide">Return to Home Layout</span>
          </a>
        </motion.div>

      </main>
    </div>
  );
};

export default NotFound;