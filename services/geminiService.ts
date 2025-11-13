import { GoogleGenAI } from "@google/genai";

export const generateQuoteText = async (length: 'short' | 'medium' | 'long' | 'all'): Promise<string> => {
    try {
        if (!process.env.API_KEY) {
            console.error("API_KEY environment variable not set.");
            return "API key not configured. The quick brown fox jumps over the lazy dog.";
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        let lengthPrompt = "";
        switch (length) {
            case 'short':
                lengthPrompt = "between 10 and 25 words long";
                break;
            case 'medium':
                lengthPrompt = "between 25 and 50 words long";
                break;
            case 'long':
                lengthPrompt = "between 50 and 75 words long";
                break;
            case 'all':
                lengthPrompt = "of a random length between 10 and 75 words";
                break;
        }

        const fullPrompt = `Generate a famous quote from a real person or a movie. The quote should be ${lengthPrompt}. Do not include who said it or the source. Do not include any titles, headers, or special formatting. Just the plain text of the quote.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
        });

        const text = response.text;
        if (text) {
            // Clean up the text: remove quotes, newlines and extra spaces
            return text.trim().replace(/^"|"$/g, '').replace(/\s+/g, ' ');
        } else {
            return "Failed to generate quote. The quick brown fox jumps over the lazy dog.";
        }
    } catch (error) {
        console.error("Error generating quote with Gemini:", error);
        return "An error occurred. The quick brown fox jumps over the lazy dog.";
    }
};
