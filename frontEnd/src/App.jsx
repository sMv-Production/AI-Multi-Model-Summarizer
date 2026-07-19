import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiLoader, FiTrash2 } from 'react-icons/fi';
import { FileUpload, FileList, TextInput, SummaryResult } from './components/index';
import {
  checkJobStatus,
  submitSummarizationJob,
  extractText,
  extractTextFromFile,
  extractTextFromAudio,
  extractTextFromVideo
} from './utils/api';

function App() {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const pollIntervalRef = useRef(null);
  const activeInputRef = useRef(activeInput);

    useEffect(() => {
    fetch('https://ai-multi-model-summarizer-dlfh.onrender.com/ping')
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []); // Empty dependency array ensures it runs exactly 
  
  useEffect(() => {
    activeInputRef.current = activeInput;
  }, [activeInput]);

  const clearPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearPolling();
  }, []);

  const getWordCount = (str) => {
    const trimmed = str.trim();
    return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  };

  const handleClearAll = () => {
    clearPolling();
    setFiles([]);
    setText('');
    setSummary('');
    setActiveInput(null);
    setErrorMessage('');
    setIsProcessing(false);
  };

  const getFileType = (file) => {
    const mimeType = file.type || '';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.startsWith('image/')) return 'image';
    return 'unknown';
  };

  const handleSummarize = async (content) => {
    try {
      setSummary('');
      setIsProcessing(true);
      clearPolling();

      const jobId = await submitSummarizationJob(content);
      if (!jobId) {
        setIsProcessing(false);
        setErrorMessage('Failed to create summarization job.');
        return;
      }

      pollIntervalRef.current = setInterval(async () => {
        try {
          if (!activeInputRef.current) {
            clearPolling();
            return;
          }

          const result = await checkJobStatus(jobId);

          if (result) {
            setSummary(result);
            setIsProcessing(false);
            clearPolling();
          }
        } catch (pollError) {
          console.error('Error checking job status:', pollError);
          if (pollError.response?.status === 429) {
            setErrorMessage(pollError.response.data?.error || 'Too many requests. Summary checking throttled.');
          } else {
            setErrorMessage('Error verifying updates from summary engine.');
          }
          setIsProcessing(false);
          clearPolling();
        }
      }, 3000);

    } catch (error) {
      console.error('Error generating summary:', error);
      if (error.response?.status === 429) {
        setErrorMessage(error.response.data?.error || 'Too many text requests, please try again later.');
      } else {
        setErrorMessage('Failed to generate summary. Please try again.');
      }
      setIsProcessing(false);
      clearPolling();
    }
  };

  const handleSubmit = async () => {
    setErrorMessage('');

    if (activeInput === 'text') {
      if (getWordCount(text) < 10) {
        setErrorMessage(`Please enter at least 10 words to summarize. (Current: ${getWordCount(text)})`);
        return;
      }
      await handleSummarize(text);
    }
    else if (activeInput === 'file' && files.length > 0) {
      setIsProcessing(true);
      const fileType = getFileType(files[0]);
      // eslint-disable-next-line no-useless-assignment
      let extractedText = '';

      try {
        switch (fileType) {
          case 'pdf': extractedText = await extractTextFromFile(files[0]); break;
          case 'image': extractedText = await extractText(files[0]); break;
          case 'audio': extractedText = await extractTextFromAudio(files[0]); break;
          case 'video': extractedText = await extractTextFromVideo(files[0]); break;
          default:
            setErrorMessage('Unsupported file type');
            setIsProcessing(false);
            return;
        }

        if (!activeInputRef.current || files.length === 0) {
          setIsProcessing(false);
          return;
        }

        if (extractedText && extractedText.trim().length > 0) {
          await handleSummarize(extractedText);
        } else {
          setErrorMessage('Could not extract legible text content from the provided file.');
          setIsProcessing(false);
          setFiles([]);
          setActiveInput(null);
        }
      } catch (error) {
        console.error('Extraction error:', error);
        if (error.response?.status === 429) {
          setErrorMessage(error.response.data?.error || 'Heavy file processing limit reached. Please wait before uploading more files.');
        } else {
          setErrorMessage('An error occurred during file parsing and processing.');
        }
        setIsProcessing(false);
        setFiles([]);
        setActiveInput(null);
      }
    }
  };

  const handleFileUpload = useCallback((uploadedFiles) => {
    if (text.trim() || uploadedFiles.length === 0) return;
    setFiles([uploadedFiles[0]]);
    setActiveInput('file');
  }, [text]);

  const handleRemoveFile = useCallback(() => {
    setFiles([]);
    setActiveInput(null);
    setSummary('');
    clearPolling();
    setIsProcessing(false);
  }, []);

  const handleTextChange = useCallback((newText) => {
    if (files.length > 0) return;
    setText(newText);
    setActiveInput(newText.length > 0 ? 'text' : null);
  }, [files]);

  const isFileInputDisabled = activeInput === 'text';
  const isTextInputDisabled = activeInput === 'file';

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 antialiased selection:bg-cyan-500/20">
      <main className="flex-grow container mx-auto max-w-5xl px-6 py-12 space-y-10">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent tracking-wide">
            Welcome to NeuroDigest
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Your friendly media processing workspace. Drop in a video, audio recording, PDF document, or paste a messy transcript block below, and let the AI find the core bullet points for you.
          </p>
        </motion.div>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-100 border border-red-300 text-red-900 text-sm rounded-xl text-center font-semibold shadow-sm"
          >
            {errorMessage}
          </motion.div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          <div className={`group relative bg-slate-50 p-6 rounded-2xl border transition-all duration-300 ${isFileInputDisabled
            ? 'opacity-40 border-slate-200 bg-slate-100'
            : 'border-slate-300 shadow-md hover:border-teal-600 hover:shadow-lg'
            }`}>
            <h2 className="text-lg font-bold tracking-wide text-teal-700 mb-4 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-teal-600" />
              Option 1: Upload Files
            </h2>
            <div className="space-y-4">
              <FileUpload onFileUpload={handleFileUpload} disabled={isFileInputDisabled} />
              {files.length > 0 && <FileList files={files} onRemove={handleRemoveFile} />}
            </div>
          </div>

          <div className={`group relative bg-slate-50 p-6 rounded-2xl border transition-all duration-300 ${isTextInputDisabled
            ? 'opacity-40 border-slate-200 bg-slate-100'
            : 'border-slate-300 shadow-md hover:border-cyan-600 hover:shadow-lg'
            }`}>
            <h2 className="text-lg font-bold tracking-wide text-cyan-700 mb-4 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-cyan-600" />
              Option 2: Enter Text
            </h2>
            <TextInput text={text} onTextChange={handleTextChange} disabled={isTextInputDisabled} />
          </div>
        </div>

        {activeInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pt-4 text-center flex flex-col items-center gap-4"
          >
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="relative group/btn flex items-center gap-2 overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold px-10 py-3.5 rounded-xl transition-transform active:scale-95 disabled:opacity-50 shadow-md hover:shadow-xl"
            >
              {isProcessing ? <FiLoader className="animate-spin text-lg" /> : <FiUpload className="text-lg" />}
              <span className="tracking-wide">{isProcessing ? 'Processing...' : 'Generate Summary'}</span>
            </button>

            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 font-bold transition-colors duration-200"
            >
              <FiTrash2 size={14} /> Clear all inputs
            </button>
          </motion.div>
        )}

        <div className="pt-4">
          <SummaryResult summary={summary} />
        </div>
      </main>
    </div>
  );
}

export default App;
