import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiImage, FiFileText, FiMusic, FiVideo } from 'react-icons/fi';

const FileUpload = ({ onFileUpload, disabled }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (!disabled) {
      onFileUpload(acceptedFiles);
    }
  }, [onFileUpload, disabled]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'audio/*': ['.mp3', '.wav'],
      'video/*': ['.mp4', '.webm']
    },
    disabled
  });

  // Light Theme: Deepened accessible tones, removed dark neon drop-shadows
  const fileTypes = [
    { icon: FiImage, text: 'Images', color: 'text-teal-600' },
    { icon: FiFileText, text: 'Documents', color: 'text-emerald-600' },
    { icon: FiMusic, text: 'Audio', color: 'text-cyan-600' },
    { icon: FiVideo, text: 'Video', color: 'text-rose-600' }
  ];

  return (
    <div
      {...getRootProps()}
      // Light Theme Makeover: Smoothly switches dropzone styles across state intervals
      className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 outline-none
        ${disabled 
          ? 'cursor-not-allowed border-slate-200 bg-slate-100 opacity-40' 
          : isDragActive
            ? 'border-cyan-500 bg-cyan-50/50 scale-[1.01] shadow-md'
            : 'border-slate-300 hover:border-teal-500 hover:bg-slate-100 cursor-pointer shadow-sm'
        }`}
    >
      <input {...getInputProps()} />
      <motion.div
        animate={{ y: isDragActive ? -6 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <FiUploadCloud className={`mx-auto text-4xl mb-3 transition-colors duration-300 ${
          isDragActive ? 'text-cyan-600' : 'text-slate-400'
        }`} />
      </motion.div>
      
      <p className="text-base mb-5 font-bold tracking-wide text-slate-700">
        {disabled 
          ? 'File upload is disabled'
          : isDragActive 
            ? 'Drop to upload!' 
            : 'Drag & drop files here, or click to select'
        }
      </p>

      {/* Grid Badges: Solid slate-100 background plates with distinct borders */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {fileTypes.map(({ icon: Icon, text, color }) => (
          <motion.div
            key={text}
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-100 border border-slate-200 shadow-sm"
          >
            <Icon className={`text-lg ${color}`} />
            <span className="text-xs font-bold text-slate-600 tracking-wide">{text}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-semibold">
        <FiUploadCloud size={13} className="text-slate-500" />
        Maximum file size: 10MB per file
      </p>
    </div>
  );
};

export default FileUpload;