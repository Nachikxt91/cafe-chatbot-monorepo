☕ Cafe Multi-Agent Chatbot System
An intelligent coffee shop chatbot built with a multi-agent architecture, featuring specialized AI agents for different customer service tasks. The system uses LangChain, Groq LLM, and a React Native Expo frontend with a FastAPI backend.
🌐 Live Deployments
* 🤗 Backend API: HuggingFace Spaces
* 📱 Frontend Mobile App: Expo Build


 📦 System Architecture - Repository Structure
This is a monorepo containing the complete codebase for development and testing:
text
* cafe-chatbot-monorepo/
* ├── coffee_shop_app/     # Backend code (deployed separately to HF Spaces)
* ├── python_code/         # Frontend code (deployed separately to Expo)
* └── README.md


Deployment Repositories (maintained separately for CI/CD):
* Backend Deployment: Dedicated repo for HuggingFace Spaces with auto-deployment
* Frontend Deployment: Dedicated repo for Expo EAS builds
🏗️ Architecture Overview
This system employs a multi-agent conversational AI architecture where specialized agents handle different aspects of customer interaction:
Agent System
* Guard Agent: Validates user requests and filters inappropriate queries
* Classification Agent: Determines user intent and routes to appropriate specialized agent
* Details Agent: Handles menu inquiries, pricing, ingredients, and shop information (uses static knowledge base)
* Order Taking Agent: Manages the complete order workflow with validation and confirmation
* Recommendation Agent: Provides personalized suggestions using:
   * Apriori Algorithm: Recommends items frequently bought together
   * Popularity-based: Suggests trending items by category
Tech Stack
Backend (coffee_shop_app)
* FastAPI for REST API
* Groq API (Llama 3.1 70B) for LLM inference
* LangChain for agent orchestration
* Firebase Realtime Database for menu data storage
* Cloudinary for product image management
* Docker for containerization
* HuggingFace Spaces for deployment
Frontend (python_code)
* React Native with Expo
* TypeScript
* NativeWind (Tailwind for React Native)
* Firebase Realtime Database integration
* Cloudinary React Native SDK for image delivery
* Expo EAS Build for deployment
Data Storage
* Firebase: Product catalog, menu items stored as key-value pairs
* Cloudinary: Product images with optimized delivery
* JSON/CSV: Apriori recommendations and popularity data
📁 Project Structure
text
* .
* ├── coffee_shop_app/          # Backend FastAPI application
* │   ├── agents/              # Multi-agent system modules
* │   │   ├── __init__.py
* │   │   ├── guard_agent.py
* │   │   ├── classification_agent.py
* │   │   ├── details_agent.py
* │   │   ├── order_taking_agent.py
* │   │   ├── recommendation_agent.py
* │   │   ├── agent_protocol.py
* │   │   └── utils.py
* │   ├── recommendation_objects/  # Apriori & popularity data
* │   │   ├── apriori_recommendations.json
* │   │   └── popularity_recommendation.csv
* │   ├── agent_controller.py  # Main agent orchestration logic
* │   ├── main.py             # FastAPI entry point
* │   ├── Dockerfile          # Container configuration
* │   └── requirements.txt    # Python dependencies
* │
* ├── python_code/             # React Native Expo frontend
* │   ├── app/                # Expo Router pages
* │   │   ├── (tabs)/        # Bottom tab navigation
* │   │   ├── _layout.tsx    # Root layout
* │   │   └── index.tsx      # Entry point
* │   ├── components/         # Reusable UI components
* │   │   ├── ChatMessage.tsx
* │   │   ├── ProductCard.tsx
* │   │   └── SearchArea.tsx
* │   ├── config/            # Firebase configuration
* │   │   └── firebaseConfig.ts
* │   ├── services/          # API integration
* │   │   ├── chatBot.ts     # Backend API calls
* │   │   └── productService.ts  # Firebase queries
* │   ├── types/             # TypeScript type definitions
* │   ├── package.json       # Node dependencies
* │   └── app.json          # Expo configuration
* │
* ├── Cafe-CB-D1.jpeg       # System architecture diagram
* ├── Cafe-CB-D2.jpeg       # Agent workflow diagram
* └── README.md             # This file


🚀 Getting Started
Prerequisites
* Python 3.9+
* Node.js 18+ and npm/yarn
* Docker (for deployment)
* Expo CLI
* Groq API Key (for Llama 3.1 70B)
* Firebase project credentials
* Cloudinary account (for image hosting)
* Pinecone API key (optional, for vector embeddings)
Backend Setup
1. Clone the repository
bash
   * git clone <your-repo-url>
   * cd <repo-name>/coffee_shop_app
   2.    3. Set up Python environment
bash
      * python -m venv venv
      * source venv/bin/activate  # On Windows: venv\Scripts\activate
      * pip install -r requirements.txt
      4.       5. Configure environment variables
Create a .env file in the coffee_shop_app directory:
text
         * # Groq LLM Configuration
         * GROQ_API_KEY=your_groq_api_key_here
         * MODEL_NAME=llama-3.1-70b-versatile
         *          * # Pinecone (Optional - for vector search)
         * PINECONE_API_KEY=your_pinecone_api_key_here
         * PINECONE_INDEX_NAME=your_index_name_here
         *          * # Server Configuration
         * PORT=7860
         6.          7. Run the backend locally
bash
            * python main.py
            8.             9. The API will be available at http://localhost:7860
Frontend Setup
            1. Navigate to frontend directory
bash
               * cd python_code
               2.                3. Install dependencies
bash
                  * npm install
                  * # or
                  * yarn install
                  4.                   5. Configure environment variables
Create a .env file in the python_code directory:
text
                     * # HuggingFace Backend API
                     * HF_TOKEN=your_hf_token_here
                     *                      * # Groq Configuration (if using from frontend)
                     * GROQ_API_KEY=your_groq_api_key_here
                     * MODEL_NAME=llama-3.1-8b-instant
                     *                      * # Firebase Configuration
                     * EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
                     * EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
                     * EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
                     * EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
                     * EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
                     * EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
                     * EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
                     * EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
                     *                      * # Cloudinary Configuration (for image hosting)
                     * CLOUDINARY_API_KEY=your_cloudinary_api_key
                     * CLOUDINARY_API_SECRET=your_cloudinary_secret
                     * CLOUDINARY_CLOUD_NAME=your_cloud_name
                     *                      * # Pinecone Configuration (Optional)
                     * PINECONE_API_KEY=your_pinecone_api_key
                     * PINECONE_INDEX_NAME=coffeeshop
                     *                      * # Firebase Service Account (Backend)
                     * FIREBASE_TYPE=service_account
                     * FIREBASE_PROJECT_ID=coffeeshop-app-xxxxx
                     * FIREBASE_PRIVATE_KEY_ID=your_private_key_id
                     * FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour_Key_Here\n-----END PRIVATE KEY-----
                     * FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
                     * FIREBASE_CLIENT_ID=your_client_id
                     * FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
                     * FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
                     * FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
                     * FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk
                     * FIREBASE_UNIVERSE_DOMAIN=googleapis.com
                     6.                      7. Run the Expo app
bash
                        * npx expo start
                        8.                         * Press i for iOS simulator
                        * Press a for Android emulator
                        * Scan QR code with Expo Go app on your phone
🎯 Key Features
Multi-Agent Conversation Flow
                        1. User sends message → Guard Agent validates request
                        2. Classification Agent determines intent (details/order/recommendation)
                        3. Appropriate specialized agent processes request
                        4. Order Taking Agent can trigger Recommendation Agent for upselling
                        5. Response returned to frontend with proper state management
Recommendation System
                        * Apriori-based: "Customers who ordered Latte also bought Croissant"
                        * Popularity: Top items overall or by category
                        * Smart Trigger: Automatically suggests items during order process
                        * Confidence Scoring: Recommendations ranked by confidence levels
Order Management
                        * Step-by-step order collection (6-step process)
                        * Real-time menu validation against Firebase data
                        * Order modification support
                        * Cart persistence in conversation memory
                        * Final confirmation with itemized pricing and total
Image & Data Management
                        * Cloudinary Integration: Optimized image delivery for product photos
                        * Firebase Realtime Database: Fast key-value storage for menu items, prices, categories
                        * Responsive Images: Automatic image optimization based on device capabilities
📡 API Endpoints
Backend API (HuggingFace Spaces)
Base URL: https://nachikxt91-cafe-chatbot.hf.space
                        * POST /query - Main chatbot interaction endpoint
json
                           * {
                           *   "input": {
                           *     "messages": [
                           *       {
                           *         "role": "user",
                           *         "content": "I want to order a latte"
                           *       }
                           *     ]
                           *   }
                           * }
                           *                            * Response:
json
                              * {
                              *   "role": "assistant",
                              *   "content": "I'd be happy to help you order a latte!...",
                              *   "memory": {
                              *     "agent": "order_taking_agent",
                              *     "step_number": 1,
                              *     "order": [{"item": "Latte", "quantity": 1, "price": 4.75}]
                              *   }
                              * }
                              *                               * GET /health - Health check endpoint
                              * GET / - API status and version info
🌐 Deployment
Backend - HuggingFace Spaces
The backend is deployed on HuggingFace Spaces with Docker runtime:
                              * Live URL: https://huggingface.co/spaces/Nachikxt91/cafe-chatbot
                              * Runtime: Docker with Python 3.12-slim
                              * Port: 7860 (HF Spaces default)
                              * Auto-deployment: Pushes to dedicated backend repo trigger rebuilds
Environment Setup on HF Spaces:
                              1. Navigate to Space Settings → Variables
                              2. Add secrets:
                              * GROQ_API_KEY
                              * MODEL_NAME
                              * PINECONE_API_KEY (optional)
                              * PINECONE_INDEX_NAME (optional)
Frontend - Expo EAS Build
The mobile app is built and deployed using Expo Application Services:
                              * Build URL: Expo Build Dashboard
                              * Project: coffee_shop_app
                              * Account: nacxt
                              * Auto-deployment: Pushes to dedicated frontend repo trigger EAS builds
Environment Setup for EAS:
bash
                              * # Configure EAS secrets
                              * eas secret:create --name FIREBASE_API_KEY --value your_value --scope project
                              * eas secret:create --name CLOUDINARY_API_KEY --value your_value --scope project
                              * eas secret:create --name GROQ_API_KEY --value your_value --scope project


Build Commands:
bash
                              * # Install EAS CLI
                              * npm install -g eas-cli
                              *                               * # Login to Expo
                              * eas login
                              *                               * # Configure project
                              * eas build:configure
                              *                               * # Build for Android
                              * eas build --platform android --profile production
                              *                               * # Build for iOS
                              * eas build --platform ios --profile production
                              *                               * # Submit to stores
                              * eas submit --platform android
                              * eas submit --platform ios


Monorepo vs Deployment Repos
                              * This Monorepo: Contains complete source code for development
                              * Backend Deployment Repo: Streamlined repo with only coffee_shop_app/ for HF Spaces
                              * Frontend Deployment Repo: Streamlined repo with only python_code/ for Expo EAS
This separation allows for:
                              * Cleaner CI/CD pipelines
                              * Faster deployment builds
                              * Independent versioning
                              * Reduced repository size for each platform
📦 Dependencies
Backend (requirements.txt)
text
                              * fastapi==0.104.1
                              * uvicorn[standard]==0.24.0
                              * pydantic==2.5.0
                              * python-multipart==0.0.6
                              * langchain-groq==0.1.0
                              * langchain-core==0.1.0
                              * groq==0.4.0
                              * python-dotenv==1.0.0


Frontend (package.json highlights)
                              * expo: ~54.0.13
                              * react: 19.1.0
                              * react-native: 0.81.4
                              * expo-router: ^6.0.12
                              * @react-native-firebase/app: ^23.5.0
                              * @react-native-firebase/database: ^23.4.1
                              * cloudinary-react-native: ^1.3.0
                              * axios: ^1.12.2
                              * nativewind: ^2.0.11
🎨 UI Components
                              * ChatScreen: Main conversation interface with typing indicators
                              * ProductList: Browse menu items with Cloudinary images
                              * CartView: Order summary with real-time total calculation
                              * SearchArea: Product search with category filters
                              * MessageBubbles: Differentiated UI for user/agent messages
                              * AgentIndicator: Visual feedback showing which agent is responding
🔐 Security
                              * Non-root user in Docker container (user: appuser)
                              * Environment variable management via platform secrets
                              * Guard agent filters inappropriate/malicious requests
                              * Input validation at all agent levels
                              * CORS configuration for production
                              * Firebase security rules for database access
                              * Cloudinary signed URLs for secure image delivery
🗄️ Data Architecture
Firebase Structure
json
                              * {
                              *   "products": {
                              *     "product_id_1": {
                              *       "name": "Cappuccino",
                              *       "category": "Coffee",
                              *       "price": 4.50,
                              *       "description": "Rich espresso with steamed milk",
                              *       "imageUrl": "cloudinary://...",
                              *       "rating": 4.5
                              *     }
                              *   }
                              * }


Cloudinary Image Naming Convention
text
                              * products/
                              *   ├── cappuccino_product.jpg
                              *   ├── latte_featured.jpg
                              *   └── croissant_hero.png


Recommendation Data (CSV/JSON)
                              * Apriori: Item-to-item confidence scores
                              * Popularity: Transaction counts by product and category
🐛 Troubleshooting
Common Issues
                              1. HuggingFace Space sleeping
                              * Spaces on free tier sleep after inactivity
                              * First request may take 30-60 seconds to wake up
                              * Consider upgrading to persistent hardware
                              2. Firebase connection errors
                              * Verify Firebase credentials in .env
                              * Check Firebase console for database rules
                              * Ensure database URL is correct (ends with .firebaseio.com)
                              3. Cloudinary images not loading
                              * Verify CLOUDINARY_CLOUD_NAME is correct
                              * Check image public IDs in Cloudinary dashboard
                              * Ensure images are in correct folder structure
                              4. Frontend can't connect to backend
                              * Update API URL in services/chatBot.ts to HF Space URL
                              * Ensure CORS is configured properly
                              * Check Space logs in HF dashboard
                              5. Recommendation not working
                              * Verify CSV/JSON files in recommendation_objects/ are uploaded
                              * Check data format matches expected schema
                              * Ensure product names match exactly between files
🧪 Testing
Backend Tests
bash
                              * cd coffee_shop_app
                              * pytest tests/  # Add your test files


Frontend Tests
bash
                              * cd python_code
                              * npm test


Manual Testing Checklist
                              * Guard agent blocks inappropriate requests
                              * Classification routes to correct agents
                              * Order flow completes successfully
                              * Recommendations appear during ordering
                              * Firebase data loads correctly
                              * Cloudinary images display properly
🤝 Contributing
                              1. Fork the repository
                              2. Create a feature branch: git checkout -b feature/amazing-feature
                              3. Commit changes: git commit -m 'Add amazing feature'
                              4. Push to branch: git push origin feature/amazing-feature
                              5. Open a Pull Request
📝 Future Enhancements
                              * Voice input support with speech-to-text
                              * Multi-language support (i18n)
                              * Payment integration (Stripe/Razorpay)
                              * Order tracking with real-time updates
                              * Admin dashboard for menu management
                              * Analytics dashboard (order patterns, popular items)
                              * A/B testing for recommendations
                              * Customer feedback and rating system
                              * Progressive Web App (PWA) version
                              * Push notifications for order status
                              * Loyalty points and rewards program
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
👨‍💻 Author
Built with ❤️ as a production-grade AI/ML portfolio project showcasing:
                              * Multi-agent LLM systems
                              * Full-stack mobile development
                              * Cloud deployment and DevOps
                              * Real-time database integration
                              * Recommendation algorithms
🙏 Acknowledgments
                              * HuggingFace for free GPU-powered Space hosting
                              * Groq for blazing-fast Llama 3.1 inference
                              * LangChain for agent framework and orchestration
                              * Expo for mobile development platform and EAS builds
                              * FastAPI for modern Python web framework
                              * Firebase for real-time database
                              * Cloudinary for optimized image delivery
________________


⭐ Star this repo if you find it helpful!

🔗 Try the live demo: Backend API | Mobile App Build
