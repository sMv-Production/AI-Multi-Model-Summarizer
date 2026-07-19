import axios from "axios";

export const extractImage = async (req, res) => {
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
};

export const extractDocument = async (req, res) => {
    const endpoint = process.env.AZURE_DOCUMENT_ENDPOINT;
    const modelId = "prebuilt-read";
    // Update the retired preview version to the stable GA version
    const apiVersion = "2024-11-30"; 

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
};
