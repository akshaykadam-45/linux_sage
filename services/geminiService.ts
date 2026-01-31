
import { GoogleGenAI, Type } from "@google/genai";
import { CommandExplanation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    command: { type: Type.STRING },
    summary: { type: Type.STRING },
    detailedDescription: { type: Type.STRING },
    synopsis: { type: Type.STRING },
    syntaxError: {
      type: Type.OBJECT,
      properties: {
        isError: { type: Type.BOOLEAN },
        location: { type: Type.STRING, description: "The part of the command that is wrong." },
        reason: { type: Type.STRING, description: "Why it is wrong." },
        correction: { type: Type.STRING, description: "The correct way to write it." },
      },
      required: ["isError"],
    },
    inputBreakdown: {
      type: Type.ARRAY,
      description: "A piece-by-piece breakdown of the specific command string provided by the user.",
      items: {
        type: Type.OBJECT,
        properties: {
          part: { type: Type.STRING },
          meaning: { type: Type.STRING },
        },
        required: ["part", "meaning"],
      },
    },
    flags: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          flag: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["flag", "description"],
      },
    },
    examples: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          code: { type: Type.STRING },
          explanation: { type: Type.STRING },
        },
        required: ["code", "explanation"],
      },
    },
    difficulty: { type: Type.STRING },
    safetyWarning: { type: Type.STRING },
  },
  required: ["command", "summary", "detailedDescription", "synopsis", "flags", "examples", "difficulty"],
};

export async function explainCommand(commandInput: string): Promise<CommandExplanation> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `You are a Linux Terminal expert. A user has provided the following command string: "${commandInput}".
  
  TASK:
  1. Validate the syntax of "${commandInput}". If it is malformed (e.g., missing mandatory arguments, wrong flag format like -la- instead of -la, or invalid characters), set 'syntaxError.isError' to true and explain it.
  2. Identify the base command.
  3. If the user provided specific arguments or flags, create an 'inputBreakdown' explaining what EACH part of that specific string does, even if it has errors.
  4. Provide a simple summary and detailed description of the command's general purpose.
  5. Provide a synopsis of general usage.
  6. List common flags.
  7. Provide 3 practical examples of usage.
  8. If the specific input "${commandInput}" is dangerous, provide a clear 'safetyWarning'.
  
  Explain everything in very simple terms for a beginner. If the command is completely non-existent or gibberish, treat it as a syntax error.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as CommandExplanation;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to explain command. Please check if it's a valid Linux command.");
  }
}
