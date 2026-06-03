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
      'text/*': ['.txt', '.pdf'],
      'audio/*': ['.mp3', '.wav'],
      'video/*': ['.mp4', '.webm']
    },
    disabled
  });

  const fileTypes = [
    { icon: FiImage, text: 'Images', color: 'text-green-500' },
    { icon: FiFileText, text: 'Documents', color: 'text-orange-500' },
    { icon: FiMusic, text: 'Audio', color: 'text-purple-500' },
    { icon: FiVideo, text: 'Video', color: 'text-red-500' }
  ];

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all
        ${disabled 
          ? 'cursor-not-allowed border-gray-200 bg-gray-50' 
          : isDragActive
            ? 'border-blue-500 bg-blue-50 scale-102'
            : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50 cursor-pointer'
        }`}
    >
      <input {...getInputProps()} />
      <motion.div
        animate={{ y: isDragActive ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <FiUploadCloud className="mx-auto text-4xl mb-4 text-blue-500" />
      </motion.div>
      <p className="text-lg mb-4 font-medium text-gray-700">
        {disabled 
          ? 'File upload is disabled'
          : 'Drag & drop files here, or click to select'
        }
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {fileTypes.map(({ icon: Icon, text, color }) => (
          <motion.div
            key={text}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            className="flex flex-col items-center gap-2 p-2 rounded-lg bg-white shadow-sm"
          >
            <Icon className={`text-xl ${color}`} />
            <span className="text-sm text-gray-600">{text}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-sm text-gray-500 flex items-center justify-center">
        <FiUploadCloud className="mr-2" />
        Maximum file size: 10MB per file
      </p>
    </div>
  );
};

export default FileUpload;