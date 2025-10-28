from dotenv import load_dotenv
import os
from .utils import get_chatbot_response
from groq import Groq
from copy import deepcopy
# REMOVE ALL EMBEDDING IMPORTS

load_dotenv()

class DetailsAgent:
    def __init__(self):
        self.client = Groq(api_key=os.getenv('GROQ_API_KEY'))
        self.model_name = os.getenv('MODEL_NAME')
        
        # No embedding client or Pinecone initialization
    
    def get_response(self, messages):
        messages = deepcopy(messages)
        user_message = messages[-1]['content']
        
        # Skip vector search - use static knowledge base
        source_knowledge = """
        Menu Items:
        - Cappuccino: $4.50
        - Latte: $4.75
        - Espresso: $2.00
        ... (add your full menu here)
        """
        
        prompt = f"""
        Using the contexts below answer the query:
        
        Contexts:
        {source_knowledge}
        
        Query: {user_message}
        """
        
        system_prompt = "You are a customer support agent for a coffee shop called Merry's Way..."
        
        messages[-1]['content'] = prompt
        input_messages = [{'role': 'system', 'content': system_prompt}] + messages[-3:]
        
        chatbot_output = get_chatbot_response(self.client, self.model_name, input_messages)
        output = self.postprocess(chatbot_output)
        return output
    
    def postprocess(self, output):
        output_dict = {
            'role': 'assistant',
            'content': output,
            'memory': {'agent': 'details_agent'}
        }
        return output_dict
