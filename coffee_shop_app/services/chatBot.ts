import axios from 'axios';
import { MessageInterface } from '@/types/types';

const API_URL = "https://nachikxt91-cafe-chatbot.hf.space/query"
const HEALTH_URL = "https://nachikxt91-cafe-chatbot.hf.space/health"

interface ChatBotAPIResponse {
    response: MessageInterface;
}

interface HealthCheckResponse {
    status: string;
    service?: string;
}

async function callChatBotAPI(messages: MessageInterface[]): Promise<MessageInterface> {
    try {
        console.log('🤖 Calling Railway chatbot API...');
        console.log('📤 Sending messages:', JSON.stringify(messages, null, 2));

        const response = await axios.post<ChatBotAPIResponse>(
            API_URL,
            { input: { messages } },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 30000,
            }
        );

        console.log('📥 Received response:', response.data);
        return response.data.response;
    } catch (error: any) {
        console.error('❌ Error calling chatbot API:', error);
        
        if (error.response) {
            const statusCode = error.response.status;
            const errorMessage = error.response.data?.detail || 
                               error.response.data?.message || 
                               'Server error occurred';
            throw new Error(`Server Error (${statusCode}): ${errorMessage}`);
        } else if (error.request) {
            throw new Error('No response from server. Check your internet connection.');
        }
        
        throw new Error(`Failed to connect to chatbot: ${error.message || 'Unknown error'}`);
    }
}

async function checkAPIHealth(): Promise<boolean> {
    try {
        console.log('🔍 Checking API health...');
        const response = await axios.get<HealthCheckResponse>(HEALTH_URL, { timeout: 10000 });
        console.log('✅ API Health Check:', response.data);
        return response.data.status === 'healthy';
    } catch (error) {
        console.error('❌ Health check failed:', error);
        return false;
    }
}

async function wakeUpAPI(): Promise<void> {
    try {
        console.log('🔥 Warming up Railway API server...');
        const isHealthy = await checkAPIHealth();
        if (isHealthy) {
            console.log('✅ API server is ready!');
        } else {
            console.log('⚠️ API server responded but not healthy');
        }
    } catch (error) {
        console.log('⚠️ Could not wake up server, it will wake on first message');
    }
}

export { callChatBotAPI, checkAPIHealth, wakeUpAPI };
