import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Converts a File object to a Base64 string suitable for the Gemini API.
 */
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      // Remove the Data URL prefix (e.g., "data:video/mp4;base64,")
      const base64Content = base64Data.split(',')[1];
      resolve({
        inlineData: {
          data: base64Content,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Analyzes the video using the Gemini 3 Pro model.
 */
export const analyzeVideoForm = async (videoFile: File): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  try {
    // 1. Prepare the video data
    const videoPart = await fileToGenerativePart(videoFile);

    // 2. Prepare the request
    // Switching to gemini-3-pro-preview for advanced reasoning and multimodal capabilities
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        thinkingConfig: { thinkingBudget: 2048 }, // Enable reasoning for biomechanical analysis
      },
      contents: {
        parts: [
          videoPart,
          { text: "Analyze this exercise form strictly following the Coach Gemini protocol." }
        ]
      }
    });

    // 3. Extract text
    const text = response.text;
    if (!text) {
      throw new Error("No analysis received from the model.");
    }

    return text;

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    throw new Error(error.message || "Failed to analyze video.");
  }
};