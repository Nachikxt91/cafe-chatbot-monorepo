from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize ChatGroq (automatically reads GROQ_API_KEY from environment)
llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0.7
)

# Create a translation chain
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that translates {input_language} to {output_language}."),
    ("human", "{input}")
])

# Build the chain with output parser
chain = prompt | llm | StrOutputParser()

# Invoke the chain
result = chain.invoke({
    "input_language": "English",
    "output_language": "French",
    "input": "I love programming."
})

print(result)
