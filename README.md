# Shield Space – No More Bullying

Shield Space is an AI-powered web platform designed to help children and teens recognize and respond to cyberbullying. By analyzing messages or images users receive, the system identifies emotional tone, detects potential bullying, and offers a personalized action plan.

🔗 **Live demo**: [shieldspace.games](https://shieldspace.games/)

## Key Features

- NLP-based bullying detection (custom BERT model)
- Emotion classification for user support
- OCR support for detecting bullying in images
- Tailored coping strategies and support plans
- Built with children’s safety and clarity in mind

## Why it Matters

Cyberbullying can be hard for young people to recognize or talk about. Many don’t know how to describe what they’re feeling or what to do next.

Shield Space addresses this by:
- Using multiple annotated datasets to train a custom NLP model for detecting toxic, harmful, and bullying messages.
- Supporting text and image inputs using OCR (Tesseract.js).
- Providing tailored, AI-generated emotional support plans based on the user’s input and mental state.

The goal: make users feel **safe**, **understood**, and **empowered**.

## How It Works

1. **Input a Message or Image**  
   Paste a message you received — or upload a screenshot of it.

2. **AI-Powered Assessment**  
   The system analyzes:
   - Toxicity
   - Emotional tone
   - Signs of cyberbullying

3. **Receive a 3-Step Plan**  
   - **Analysis**: What the AI sees and why it matters  
   - **Support Plan**: Actions you can take immediately  
   - **Personal Development Plan**: Ongoing advice tailored to your situation
  

## Screenshots

![Emotion Detection Tool](https://github.com/user-attachments/assets/2b7b715e-682b-4a16-a2c8-edf804cc9662)
*Upload a message or screenshot*

![Step 1: Analysis](https://github.com/user-attachments/assets/6e764021-68f3-41bd-b0e2-cb903ac26bde)
![Step 2: Support Plan](https://github.com/user-attachments/assets/4473e30a-a04e-4ed0-bcd5-ab4cc663e460)
![Step 3: Personal Plan](https://github.com/user-attachments/assets/47fd301d-5527-4cc9-81bd-12f7f5a2427c)


## Tech Stack

- Frontend: React.js
- Backend: FastAPI (Python), NestJS(NodeJS)
- AI: Custom-trained BERT model + Gemini LLM
- OCR: Tesseract.js
- Deployment: Docker, DigitalOcean, GitHub Actions




