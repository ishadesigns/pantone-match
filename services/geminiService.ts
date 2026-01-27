import { GoogleGenAI, Type } from "@google/genai";
import { PantoneColor } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateThemePalette = async (theme: string): Promise<PantoneColor[]> => {
  try {
    const ai = getClient();
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a palette of 8 unique, distinct, and visually coherent Pantone-style colors based on the theme: "${theme}". 
      Ensure the colors are visually distinct from each other to be suitable for a memory game.
      Provide a realistic Pantone code (format ##-####) and a creative name for each.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              hex: { type: Type.STRING, description: "Hex color code, e.g., #FF5733" },
              name: { type: Type.STRING, description: "Color name, e.g., Sunset Orange" },
              code: { type: Type.STRING, description: "Pantone code, e.g., 16-1452" }
            },
            required: ["hex", "name", "code"],
            propertyOrdering: ["hex", "code", "name"]
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("No data returned from AI");

    const palette: PantoneColor[] = JSON.parse(jsonStr);
    
    // Ensure we have exactly 8 colors, if API returns more or less, handle gracefully (slice or error)
    return palette.slice(0, 8);
  } catch (error) {
    console.error("Failed to generate theme:", error);
    throw error;
  }
};