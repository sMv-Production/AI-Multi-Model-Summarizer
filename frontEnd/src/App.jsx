import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiLoader } from 'react-icons/fi';
import { Navbar, Footer, FileUpload, FileList, TextInput, SummaryResult } from './components/index';
import { checkJobStatus, submitSummarizationJob, extractText, extractTextFromFile, extractTextFromAudio, extractTextFromVideo } from './utils/api';

function App() {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // 'file' or 'text'
  2
  const handleFileUpload = useCallback((uploadedFiles) => {
    if (text.trim()) {
      alert('Please clear the text input before uploading files');
      return;
    }
    if (uploadedFiles.length > 1) {
      alert('Please upload only one file at a time');
      return;
    }
    setFiles([uploadedFiles[0]]);
    setActiveInput('file');
  }, [text]);

  const getFileType = (file) => {
    const mimeType = file.type;
    if (mimeType.startsWith('audio/')) {
      return 'audio';
    } else if (mimeType.startsWith('video/')) {
      return 'video';
    } else if (mimeType === 'application/pdf') {
      return 'pdf';
    } else if (mimeType.startsWith('image/')) {
      return 'image';
    } else {
      return 'unknown';
    }
  };


  const handleRemoveFile = useCallback((fileToRemove) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(file => file !== fileToRemove);
      if (updatedFiles.length === 0) {
        setActiveInput(null);
      }
      return updatedFiles;
    });
  }, []);

  const handleTextChange = useCallback((newText) => {
    if (files.length > 0) {
      alert('Please remove uploaded files before entering text');
      return;
    }
    setText(newText);
    setActiveInput(newText.trim() ? 'text' : null);
  }, [files]);


  const handleSummarize = async (text) => {
    try {
      setSummary('');
      setIsProcessing(true);
      const jobId = await submitSummarizationJob(text);
      if (!jobId) {
        return;
      }
      setTimeout(async () => {
        const result = await checkJobStatus(jobId);
        if (!result) {
          return;
        }
        setSummary(result);
        setIsProcessing(false);
      }, 5000);
    } catch (error) {
      console.error('Error generating summary:', error);
      setIsProcessing(false);
    };
  }

  const handleSubmit = async () => {
    if (files.length === 0 && !text.trim()) {
      alert('Please upload files or enter text to summarize');
      return;
    }
    try {
      if (text) {
        handleSummarize(text);
      }
      else {
        setIsProcessing(true)
        const filetype = getFileType(files[0]);
        switch (filetype) {
          case 'pdf':
            {
              const res = await extractTextFromFile(files[0]);
              if (res) handleSummarize(res);
              break;
            }
          case 'image': {
            const res = await extractText(files[0]);
            if (res) handleSummarize(res);
            break;
          }
          case 'audio':
            {
              const res = await extractTextFromAudio(files[0]);
              if (res) handleSummarize(res);
              break;
            }
          case 'video':
            {
              alert('Video file uploaded');
              const res = await extractTextFromVideo(files[0]);
              if (res) handleSummarize(res);
              break;
            }
          default:
            alert('Unknown file uploaded');
            break;
        }
      }
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  }

  const isFileInputDisabled = activeInput === 'text';
  const isTextInputDisabled = activeInput === 'file';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Multimodal Summarization
          </h1>
          <p className="text-gray-600 text-lg">
            Choose one input method:
            <span className="font-semibold text-blue-600"> Upload Files </span>
            or
            <span className="font-semibold text-blue-600"> Enter Text</span>
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-white p-4 rounded-lg shadow-sm transition-opacity ${isFileInputDisabled ? 'opacity-50' : ''
              }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Option 1: Upload Files</h2>
            <FileUpload
              onFileUpload={handleFileUpload}
              disabled={isFileInputDisabled}
            />
            {files.length > 0 && <FileList files={files} onRemove={handleRemoveFile} />}
            {isFileInputDisabled && (
              <p className="text-sm text-red-500 mt-2">
                Please clear text input to upload files
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-white p-4 rounded-lg shadow-sm transition-opacity ${isTextInputDisabled ? 'opacity-50' : ''
              }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Option 2: Enter Text</h2>
            <TextInput
              text={text}
              onTextChange={handleTextChange}
              disabled={isTextInputDisabled}
            />
            {isTextInputDisabled && (
              <p className="text-sm text-red-500 mt-2">
                Please remove files to enter text
              </p>
            )}
          </motion.div>
        </div>

        {(files.length > 0 || text.trim()) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`flex items-center justify-center gap-2 mx-auto
                bg-blue-500 text-white px-8 py-4 rounded-lg font-medium text-lg
                transform transition hover:bg-blue-600 hover:shadow-lg
                ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? (
                <>
                  <FiLoader className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FiUpload />
                  Generate Summary
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        <SummaryResult summary={summary} />
      </main>

      <Footer />
    </div>
  );
}

export default App;