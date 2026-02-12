
import { GoogleGenAI, Type } from "@google/genai";
import { FragranceGuidance } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFragranceGuidance = async (
  fragranceName: string,
  timeOfDay: string,
  weather: string = "Clear"
): Promise<FragranceGuidance> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide luxury fragrance guidance for wearing '${fragranceName}' at ${timeOfDay} with ${weather} weather. 
      Also provide a full-day journey outlook for the Top, Heart, and Base notes.
      Follow the luxury brand tone: intelligent, poetic, and reassuring.`,
      config: {
        systemInstruction: "You are a Master Perfumer's AI assistant for a luxury brand. You never use tech jargon. You speak in poetic, sensorial terms. You suggest, never automate. For the journey, provide one sentence of guidance and one word for the 'feeling' for each stage (Top, Heart, Base).",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tone: { type: Type.STRING, description: "A single word reflecting the emotional tone now." },
            poeticSuggestion: { type: Type.STRING, description: "A short, poetic sentence about how the fragrance feels now." },
            why: { type: Type.STRING, description: "A brief explanation of why this fits the current context." },
            journey: {
              type: Type.OBJECT,
              properties: {
                top: { 
                  type: Type.OBJECT, 
                  properties: { 
                    guidance: { type: Type.STRING },
                    feeling: { type: Type.STRING }
                  },
                  required: ["guidance", "feeling"]
                },
                heart: { 
                  type: Type.OBJECT, 
                  properties: { 
                    guidance: { type: Type.STRING },
                    feeling: { type: Type.STRING }
                  },
                  required: ["guidance", "feeling"]
                },
                base: { 
                  type: Type.OBJECT, 
                  properties: { 
                    guidance: { type: Type.STRING },
                    feeling: { type: Type.STRING }
                  },
                  required: ["guidance", "feeling"]
                }
              },
              required: ["top", "heart", "base"]
            }
          },
          required: ["tone", "poeticSuggestion", "why", "journey"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Guidance Error:", error);
    // Fallback data
    return {
      tone: "Balanced",
      poeticSuggestion: "Your fragrance evolves gracefully with you.",
      why: "The natural progression of the perfume's heart notes provides a steady presence.",
      journey: {
        top: { guidance: "Awaken with the bright, ephemeral citrus opening.", feeling: "Luminous" },
        heart: { guidance: "The floral core blossoms as the day finds its rhythm.", feeling: "Centered" },
        base: { guidance: "Rich woods and amber emerge as shadows lengthen.", feeling: "Enveloping" }
      }
    };
  }
};
