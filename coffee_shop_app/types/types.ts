export interface Product {
    id: string;
    category: string;
    description: string;
    image_url: string;
    name: string;
    price: number;
    rating: number;
}

export interface ProductCategory {
    id: string;
    selected: boolean;
}

export interface MessageInterface {
    role: string;
    content: string;
    memory?: any;
}

// Optional: Add these for better type safety in chatBot.ts
export interface ChatBotAPIResponse {
    response: MessageInterface;
}

export interface ChatBotAPIError {
    detail?: string;
    message?: string;
}
