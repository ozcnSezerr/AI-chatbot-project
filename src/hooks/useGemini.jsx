import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const generate = async (messages) => {
    setLoading(true);
    setError(null);
    try {
      const lastUserMessage = messages[messages.length - 1].text;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: lastUserMessage,
      });
      setLoading(false);
      return response.text || "No response from Gemini.";
    } catch (err) {
      console.error(err);
      setError("Error connecting to Gemini API.");
      setLoading(false);
      return "Error connecting to Gemini API.";
    }
  };

  return { generate, loading, error };
};
