
import { GoogleGenAI, Type } from "@google/genai";
import { SymptomAnalysis, HealthTip } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSymptoms = async (symptoms: string): Promise<SymptomAnalysis> => {
  const prompt = `
    Analyze the following user-provided symptoms. Your goal is to provide general, helpful information, not a medical diagnosis. 
    Your response MUST be a JSON object.
    - The 'possibleConditions' should be general possibilities. 
    - The 'recommendations' should suggest general wellness tips or when to consult a doctor. 
    - The 'redFlags' should list any described symptoms that might warrant immediate medical attention.
    - ALWAYS include a disclaimer in the recommendations that you are not a medical professional and the user should consult a doctor for any health concerns.

    Symptoms: "${symptoms}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            possibleConditions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                },
                required: ['name', 'description', 'severity'],
              },
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            redFlags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['possibleConditions', 'recommendations', 'redFlags'],
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    // Ensure the disclaimer is present
    const hasDisclaimer = parsedJson.recommendations.some((rec: string) => rec.toLowerCase().includes("not a medical professional") || rec.toLowerCase().includes("consult a doctor"));
    if (!hasDisclaimer) {
        parsedJson.recommendations.push("Disclaimer: This is AI-generated information and not a substitute for professional medical advice. Please consult a healthcare provider for any health concerns.");
    }
      
    return parsedJson as SymptomAnalysis;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please try again.");
  }
};

export const getHealthTip = async (): Promise<HealthTip> => {
  const prompt = `
    Generate a single, random, concise, and actionable health tip suitable for a general audience.
    Provide a catchy, short title for the tip.
    Your response MUST be a JSON object with a "title" and a "tip" field.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A short, catchy title for the tip." },
            tip: { type: Type.STRING, description: "The actionable health tip." },
          },
          required: ['title', 'tip'],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as HealthTip;
  } catch (error) {
    console.error("Error calling Gemini API for health tip:", error);
    throw new Error("Failed to fetch a health tip. Please try again.");
  }
};
