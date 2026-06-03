import express from "express";
import axios from "axios";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. TEXT SUMMARIZATION ENDPOINTS
// ==========================================
app.post("/api/summarize/submit", async (req, res) => {
    const { text } = req.body;
    const endpoint = `${process.env.AZURE_LANGUAGE_ENDPOINT}/language/analyze-text/jobs?api-version=2023-04-01`;

    const requestBody = {
        displayName: "Text Summarization",
        analysisInput: { documents: [{ id: "1", language: "en", text }] },
        tasks: [
            {
                kind: "ExtractiveSummarization",
                taskName: "Summarization Task",
                parameters: { sentenceCount: 5 },
            },
        ],
    };

    try {
        const response = await axios.post(endpoint, requestBody, {
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": process.env.AZURE_LANGUAGE_KEY,
            },
        });

        const jobId = response.headers["operation-location"].split("/").pop().split("?")[0];
        res.json({ jobId });
    } catch (error) {
        console.error("Error submitting job:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to submit summarization job" });
    }
});

app.get("/api/summarize/status/:jobId", async (req, res) => {
    const { jobId } = req.params;
    
    // FIXED: Appended missing api-version query string parameter to prevent 404
    const endpoint = `${process.env.AZURE_LANGUAGE_ENDPOINT}/language/analyze-text/jobs/${jobId}?api-version=2023-04-01`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": process.env.AZURE_LANGUAGE_KEY,
            },
        });

        if (response.status === 200) {
            const jobData = response.data;

            // FIXED: Handle intermediate states safely so processing doesn't throw a 500
            if (jobData.status === "running" || jobData.status === "notStarted") {
                return res.json({ status: jobData.status });
            }

            if (jobData.status === "failed") {
                return res.status(400).json({ status: "failed", message: "Azure task failed." });
            }

            if (jobData.status === "succeeded") {
                if (jobData.tasks?.items?.[0]?.results?.documents?.[0]) {
                    const resultSentences = jobData.tasks.items[0].results.documents[0].sentences;
                    const summary = resultSentences.map((sentence) => sentence.text).join(" ");
                    return res.json({ status: "succeeded", summary });
                } else {
                    return res.status(500).json({ error: "Azure payload structured unexpectedly." });
                }
            }

            return res.json({ status: jobData.status });
        } else {
            res.status(response.status).json({ error: "Azure job lookup unsuccessful" });
        }
    } catch (error) {
        console.error("Error fetching job results:", error.response?.data || error.message);
        res.status(500).json({ error: "Error fetching job results" });
    }
});

// ==========================================
// 2. EXTRACTION ROUTES (api/extract/:fileType)
// ==========================================

// IMAGE EXTRACTION
app.post("/api/extract/image", upload.single("file"), async (req, res) => {
    const endpoint = process.env.AZURE_VISION_ENDPOINT;
    try {
        const response = await axios.post(
            `${endpoint}/vision/v3.2/read/analyze`,
            req.file.buffer,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.AZURE_VISION_KEY,
                    "Content-Type": "application/octet-stream",
                },
            }
        );

        const operationLocation = response.headers["operation-location"];
        let status = "running";
        let result = null;

        while (status === "running") {
            const resultResponse = await axios.get(operationLocation, {
                headers: { "Ocp-Apim-Subscription-Key": process.env.AZURE_VISION_KEY },
            });
            result = resultResponse.data;
            status = result.status;
            if (status === "succeeded") break;
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        const textResults = result.analyzeResult.readResults;
        const text = textResults
            .map((page) => page.lines.map((line) => line.text).join("\n"))
            .join("\n\n");

        res.json({ text });
    } catch (error) {
        console.error("Error extracting text from image:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to extract image text" });
    }
});

// DOCUMENT EXTRACTION
app.post("/api/extract/document", upload.single("file"), async (req, res) => {
    const endpoint = process.env.AZURE_DOCUMENT_ENDPOINT;
    const modelId = "prebuilt-read";
    const apiVersion = "2024-07-31-preview";

    try {
        const response = await axios.post(
            `${endpoint}/documentintelligence/documentModels/${modelId}:analyze?api-version=${apiVersion}`,
            req.file.buffer,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.AZURE_DOCUMENT_KEY,
                    "Content-Type": "application/octet-stream"
                },
            }
        );

        const operationLocation = response.headers["operation-location"];
        let status = "running";
        let result = null;

        while (status === "running" || status === "notStarted") {
            const resultResponse = await axios.get(operationLocation, {
                headers: { "Ocp-Apim-Subscription-Key": process.env.AZURE_DOCUMENT_KEY },
            });
            result = resultResponse.data;
            status = result.status;
            if (status === "succeeded") break;
            if (status === "failed") throw new Error("Document analysis failed.");
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        const readResults = result.analyzeResult?.content || "";
        res.json({ text: readResults });
    } catch (error) {
        console.error("Error parsing document:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to parse document" });
    }
});

// AUDIO EXTRACTION
app.post("/api/extract/audio", upload.single("audio"), async (req, res) => {
    const endpoint = process.env.AZURE_SPEECH_ENDPOINT;
    try {
        const formData = new FormData();
        const audioBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
        formData.append("audio", audioBlob, req.file.originalname);

        const response = await fetch(
            `${endpoint}/speechtotext/transcriptions:transcribe?api-version=2024-11-15`,
            {
                method: "POST",
                headers: { "Ocp-Apim-Subscription-Key": process.env.AZURE_SPEECH_KEY },
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Speech API returned status ${response.status}`);
        }

        const result = await response.json();
        const transcription = result.combinedPhrases.map((p) => p.text).join(" ");
        res.json({ text: transcription });
    } catch (error) {
        console.error("Error transcribing audio:", error.message);
        res.status(500).json({ error: "Transcription failed." });
    }
});

// VIDEO EXTRACTION
app.post("/api/extract/video", upload.single("video"), async (req, res) => {
    const endpoint = process.env.AZURE_SPEECH_ENDPOINT;
    try {
        const formData = new FormData();
        const videoBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
        formData.append("audio", videoBlob, "extracted_audio.wav");

        const response = await fetch(
            `${endpoint}/speechtotext/transcriptions:transcribe?api-version=2024-11-15`,
            {
                method: "POST",
                headers: { "Ocp-Apim-Subscription-Key": process.env.AZURE_SPEECH_KEY },
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Speech API returned status ${response.status}`);
        }

        const result = await response.json();
        const transcription = result.combinedPhrases.map((p) => p.text).join(" ");
        res.json({ text: transcription });
    } catch (error) {
        console.error("Video audio parsing error:", error.message);
        res.status(500).json({ error: "Failed parsing video audio track" });
    }
});

app.listen(PORT, () => console.log(`Backend server active on port ${PORT}`));