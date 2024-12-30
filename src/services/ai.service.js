import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AIService {
  async getWaterUsageAnalysis(data) {
    try {
      const response = await axios.post(`${API_URL}/ai/analyze`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to analyze water usage');
    }
  }

  async getConservationTips(usage) {
    try {
      const response = await axios.post(`${API_URL}/ai/tips`, { usage });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get conservation tips');
    }
  }

  async predictFutureUsage(historicalData) {
    try {
      const response = await axios.post(`${API_URL}/ai/predict`, { historicalData });
      return response.data;
    } catch (error) {
      throw new Error('Failed to predict future usage');
    }
  }

  async getChatbotResponse(message) {
    try {
      const response = await axios.post(`${API_URL}/ai/chat`, { message });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get chatbot response');
    }
  }

  async getLeakPrediction(sensorData) {
    try {
      const response = await axios.post(`${API_URL}/ai/leak-detection`, { sensorData });
      return response.data;
    } catch (error) {
      throw new Error('Failed to analyze leak probability');
    }
  }
}

export default new AIService();
