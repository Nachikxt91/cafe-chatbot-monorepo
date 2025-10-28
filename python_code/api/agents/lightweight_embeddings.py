import numpy as np
from typing import List
from groq import Groq
import os

class LightweightEmbeddings:
    """Lightweight embedding using text hashing - no model loading"""
    
    def __init__(self):
        self.dimension = 384  # Match your Pinecone dimension
    
    def embed_query(self, text: str) -> List[float]:
        """Generate embeddings using simple hashing (fallback method)"""
        # Simple hash-based embedding for memory efficiency
        import hashlib
        
        # Generate deterministic hash
        hash_obj = hashlib.sha256(text.encode())
        hash_bytes = hash_obj.digest()
        
        # Convert to 384-dim vector
        embedding = []
        for i in range(self.dimension):
            byte_val = hash_bytes[i % len(hash_bytes)]
            embedding.append((byte_val / 255.0) * 2 - 1)  # Normalize to [-1, 1]
        
        return embedding
