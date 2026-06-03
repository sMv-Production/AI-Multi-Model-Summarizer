import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// Function to submit a text summarization job
const submitSummarizationJob = async (text) => {
  try {
    const response = await axios.post(`${BASE_URL}/summarize/submit`, { text });
    return response.data.jobId; // Returns the raw jobId string
  } catch (error) {
    console.error("Error submitting job:", error);
    throw error;
  }
};

// Function to check the status of the summarization job
const checkJobStatus = async (jobId) => {
  try {
    const response = await axios.get(`${BASE_URL}/summarize/status/${jobId}`);
    
    // UPDATED: Handle backend status strings safely
    if (response.data.status === "succeeded") {
      return response.data.summary; // Returns the actual summary text
    }
    
    // Returns "running", "notStarted", or "failed"
    return `Job status: ${response.data.status}`; 
  } catch (error) {
    console.error("Error fetching job results:", error);
    throw error;
  }
};

// Function to extract text from an image
const extractText = async (selectedImage) => {
  try {
    const formData = new FormData();
    formData.append("file", selectedImage);

    const response = await axios.post(`${BASE_URL}/extract/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.text;
  } catch (error) {
    console.error("Error extracting text:", error);
    alert("Failed to extract text. Please try again.");
  }
};

// Function to extract text from a document file
const extractTextFromFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/extract/document`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.text;
  } catch (error) {
    console.error("Error extracting document text:", error);
    alert("Failed to extract text. Please try again.");
    return null;
  }
};

// Function to extract text from an audio file
const extractTextFromAudio = async (audioFile) => {
  if (!audioFile) {
    alert("Please upload an audio file first.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("audio", audioFile);

    const response = await axios.post(`${BASE_URL}/extract/audio`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    alert("An error occurred while transcribing the audio.");
  }
};

// Function to extract text from a video file 
const extractTextFromVideo = async (videoFile) => {
  try {
    const formData = new FormData();
    formData.append("video", videoFile);

    const response = await axios.post(`${BASE_URL}/extract/video`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.text;
  } catch (error) {
    console.error("Error transcribing video track:", error);
    alert("An error occurred during transcription");
  }
};

export {
  submitSummarizationJob,
  checkJobStatus,
  extractText,
  extractTextFromFile,
  extractTextFromAudio,
  extractTextFromVideo,
};