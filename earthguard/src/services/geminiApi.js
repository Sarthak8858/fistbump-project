import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateResponse = async (prompt) => {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format the prompt
    const formattedPrompt = `As an eco-friendly AI assistant, provide detailed advice about: ${prompt}. 
    Use Markdown formatting for:
    - Headings (###)
    - Bold text (**)
    - Lists (*)
    - Code blocks (\`\`)
    Make the response well-structured and easy to read.`;

    // Generate content
    const result = await model.generateContent(formattedPrompt);
    const response = await result.response;

    // Get response text
    return response.text();

  } catch (error) {
    console.error('Gemini API Error:', {
      message: error.message,
      details: error.details,
      status: error.status
    });
    
    if (error.message.includes('API key')) {
      throw new Error('Authentication error. Please check API key.');
    } else if (error.message.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else {
      throw new Error('Unable to generate response. Please try again.');
    }
  }
};
