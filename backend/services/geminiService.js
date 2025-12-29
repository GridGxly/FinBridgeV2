import { GoogleGenerativeAI } from "@google/generative-ai";
import culturalContext from "./culturalContext.js";

let genAI;

const getGenAI = () => {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

export async function getFinancialAdvice({ message, language, culture }) {
  const model = getGenAI().getGenerativeModel({ model: "gemini-pro" });

  const cultureData = culturalContext[culture] || {};

  const systemPrompt = `
    You are FinBridge, a helpful financial assistant for a banking app.
    
    User Context:
    - Language: ${language}
    - Culture: ${culture}
    - Cultural Value: ${cultureData.values || 'General'}
    - Saving Term: ${cultureData.saving_term || 'Savings'}

    Your goal is to provide clear, actionable financial advice.
    Be professional but accessible.
    If asked to visualize data, describe it clearly (we will render charts later).
    
    User Query: ${message}
  `;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm having trouble processing that right now. Please try again later.";
  }
}

export async function getGraphData({ type, context }) {
  const model = getGenAI().getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Generate synthetic financial data for a ${type} graph.
    Context: ${context || "General personal finance overview"}
    
    Return ONLY valid JSON in the following format, with no extra text or markdown:
    {
      "labels": ["Label1", "Label2", "Label3"],
      "datasets": [
        {
          "label": "Dataset Label",
          "data": [10, 20, 30]
        }
      ]
    }
    `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Graph API error:", error);
    return null;
  }
}

export async function translateDocument({ text, fileBuffer, mimeType, targetLanguage }) {

  const model = getGenAI().getGenerativeModel({ model: "gemini-1.5-flash" });

  let promptParts = [];


  if (fileBuffer && mimeType) {
    promptParts.push({
      inlineData: {
        data: fileBuffer.toString("base64"),
        mimeType: mimeType,
      },
    });
    promptParts.push(`\nAnalyze the attached document.`);
  }


  if (text) {
    promptParts.push(`\nDocument Text Content:\n"${text.substring(0, 5000)}"`);
  }

  const systemPrompt = `
    You are an expert financial translator and auditor.
    
    Task:
    1. Translate the document content into ${targetLanguage}.
    2. Provide a concise "Executive Summary" of the key points (amounts, dates, obligations).
    3. Rate the "Confidence" of the translation (High/Medium/Low).

    Return ONLY valid JSON in this format:
    {
      "summary": "The executive summary...",
      "translatedText": "The translated text...",
      "confidence": "High"
    }
  `;

  promptParts.push(systemPrompt);

  try {
    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const textResp = response.text();

    const jsonString = textResp.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Translate API error:", error);
    return {
      summary: "Error processing document with Gemini.",
      translatedText: "Could not translate.",
      confidence: "Low"
    };
  }
}
