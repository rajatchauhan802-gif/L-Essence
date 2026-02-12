
import { GoogleGenAI, Type } from "@google/genai";
import { FragranceGuidance, DiffusionIntensity } from "../types";

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
      Provide a full-day journey outlook for the Top, Heart, and Base notes.
      Include a "ritual" (a poetic 3-5 word action) and an "intensityRecommendation" (SOFT, BALANCED, or EXPRESSIVE) for each stage.`,
      config: {
        systemInstruction: "You are a Master Perfumer's AI. Speak in poetic, sensorial terms. Never use tech jargon. Suggest rituals that feel like luxury self-care.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tone: { type: Type.STRING },
            poeticSuggestion: { type: Type.STRING },
            why: { type: Type.STRING },
            journey: {
              type: Type.OBJECT,
              properties: {
                top: { 
                  type: Type.OBJECT, 
                  properties: { 
                    guidance: { type: Type.STRING },
                    feeling: { type: Type.STRING },
                    intensityRecommendation: { type: Type.STRING },
                    ritual: { type: Type.STRING }
                  },
                  required: ["guidance", "feeling", "intensityRecommendation", "ritual"]
                },
                heart: { 
                  type: Type.OBJECT, 
                  properties: { 
                    guidance: { type: Type.STRING },
                    feeling: { type: Type.STRING },
                    intensityRecommendation: { type: Type.STRING },
                    ritual: { type: Type.STRING }
                  },
                  required: ["guidance", "feeling", "intensityRecommendation", "ritual"]
                },
                base: { 
                  type: Type.OBJECT, 
                  properties: { 
                    guidance: { type: Type.STRING },
                    feeling: { type: Type.STRING },
                    intensityRecommendation: { type: Type.STRING },
                    ritual: { type: Type.STRING }
                  },
                  required: ["guidance", "feeling", "intensityRecommendation", "ritual"]
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
    return {
      tone: "Balanced",
      poeticSuggestion: "Your fragrance evolves gracefully with you.",
      why: "The natural progression of the perfume provides a steady presence.",
      journey: {
        top: { guidance: "The bright, ephemeral citrus opening awakens.", feeling: "Luminous", intensityRecommendation: DiffusionIntensity.BALANCED, ritual: "Face the morning sun" },
        heart: { guidance: "The floral core blossoms as the day finds its rhythm.", feeling: "Centered", intensityRecommendation: DiffusionIntensity.BALANCED, ritual: "Take a deep breath" },
        base: { guidance: "Rich woods and amber emerge as shadows lengthen.", feeling: "Enveloping", intensityRecommendation: DiffusionIntensity.SOFT, ritual: "Seek quiet reflection" }
      }
    };
  }
};
