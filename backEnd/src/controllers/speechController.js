export const extractAudio = async (req, res) => {
    const endpoint = process.env.AZURE_SPEECH_ENDPOINT;
    try {
        const formData = new FormData();
        const audioBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
        formData.append("audio", audioBlob, req.file.originalname);

        // Updated API version
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
};

export const extractVideo = async (req, res) => {
    const endpoint = process.env.AZURE_SPEECH_ENDPOINT;
    try {
        const formData = new FormData();
        const videoBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
        formData.append("audio", videoBlob, "extracted_audio.wav");

        // Updated API version
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
};
