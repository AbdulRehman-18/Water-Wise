import { GoogleGenerativeAI } from "@google/generative-ai";

// For debugging - remove in production
console.log('API Key:', process.env.REACT_APP_GEMINI_API_KEY ? 'Present' : 'Missing');

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Fallback questions in case API fails
const fallbackQuestions = [
  {
    question: "How much of Earth's water is freshwater?",
    options: ["3%", "25%", "50%", "75%"],
    correct: 0,
    explanation: "Only about 3% of Earth's water is freshwater, and most of it is frozen in glaciers and ice caps."
  },
  {
    question: "Which activity typically uses the most water in a household?",
    options: ["Showering", "Toilet Flushing", "Dishwashing", "Laundry"],
    correct: 1,
    explanation: "Toilet flushing is typically the largest indoor water use in a household, accounting for about 24% of total water usage."
  },
  {
    question: "How many gallons of water can a dripping faucet waste per day?",
    options: ["1-2 gallons", "5-10 gallons", "15-20 gallons", "25-30 gallons"],
    correct: 2,
    explanation: "A single dripping faucet can waste 15-20 gallons of water per day, adding up to thousands of gallons annually."
  },
  {
    question: "Which method of watering plants is most water-efficient?",
    options: ["Sprinkler", "Drip Irrigation", "Hand Watering", "Flood Irrigation"],
    correct: 1,
    explanation: "Drip irrigation is the most efficient watering method, delivering water directly to plant roots with minimal evaporation."
  },
  {
    question: "What percentage of water can be saved by using a dual-flush toilet?",
    options: ["10-20%", "25-35%", "40-50%", "60-70%"],
    correct: 2,
    explanation: "Dual-flush toilets can save 40-50% of water compared to traditional single-flush toilets by offering different flush volumes."
  }
];

export const generateQuizQuestion = async () => {
  try {
    if (!genAI) {
      console.log('Using fallback questions due to missing API key');
      return fallbackQuestions[0];
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a multiple choice question about water conservation with the following JSON format:
    {
      "question": "The question text here",
      "options": ["option1", "option2", "option3", "option4"],
      "correct": number from 0-3 indicating the correct answer index,
      "explanation": "Detailed explanation of the correct answer"
    }
    
    Make sure the question is educational, factual, and related to water conservation, water usage, or environmental impact of water waste.`;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Received response from Gemini API');
    
    // Parse the JSON response
    try {
      const data = JSON.parse(text);
      console.log('Successfully parsed response');
      return data;
    } catch (parseError) {
      console.error('Failed to parse response:', text);
      console.log('Using fallback questions due to parse error');
      return fallbackQuestions[0];
    }
  } catch (error) {
    console.error('Error generating question:', error);
    console.log('Using fallback questions due to API error');
    return fallbackQuestions[0];
  }
};

export const generateMultipleQuestions = async (count = 5) => {
  try {
    if (!genAI) {
      console.log('Using fallback questions due to missing API key');
      return fallbackQuestions;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate ${count} unique multiple choice questions about water conservation. Return them in this exact JSON format:
{
  "questions": [
    {
      "question": "your question here",
      "options": ["option1", "option2", "option3", "option4"],
      "correct": 0,
      "explanation": "explanation here"
    }
  ]
}

Requirements:
1. Questions should be about water conservation, usage, and environmental impact
2. Each question must have exactly 4 options
3. Make sure correct index is between 0-3
4. Keep explanations concise but informative
5. Include questions about:
   - Household water usage facts
   - Water-saving techniques
   - Environmental impact
   - Conservation statistics
   - Water pollution
6. Make questions engaging and educational
7. Ensure all facts and statistics are accurate`;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const data = JSON.parse(text);
      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid response format');
      }
      
      // Validate each question
      const validQuestions = data.questions.filter(q => 
        q.question && 
        Array.isArray(q.options) && 
        q.options.length === 4 &&
        typeof q.correct === 'number' &&
        q.correct >= 0 && 
        q.correct <= 3 &&
        q.explanation
      );

      if (validQuestions.length === 0) {
        throw new Error('No valid questions in response');
      }

      return validQuestions;
    } catch (parseError) {
      console.error('Parse error:', parseError);
      throw new Error('Failed to generate valid questions. Please try again.');
    }
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
