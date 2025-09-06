# Podium-AI 🎤

Podium-AI is a web application that transforms **bullet points into polished speeches or press briefings** using **Google's Gemini API**.  
It also allows you to choose the **tone** of delivery, making it useful for executives, professionals, and content creators.

---

## ✨ Features
- 📝 Generate structured **speeches or press briefings** from simple bullet points.  
- 🎭 Choose your tone:
  - **Formal**
  - **Conversational**
  - **Executive**
- ⚡ Built with **Next.js (frontend)** and **FastAPI (backend)**.  
- 🚄 Backend powered by **uv** for fast and lightweight server execution.  
- 🤖 Integrated with **Gemini API** for natural language generation.  

---

## 🛠 Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/)  
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) with [uv](https://github.com/astral-sh/uv)  
- **Styling**: Tailwind CSS
- **AI Integration**: [Google Gemini API](https://ai.google.dev/)  

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18  
- Python >= 3.9  
- [uv](https://github.com/astral-sh/uv) installed  
- A **Gemini API Key** from [Google AI Studio](https://ai.google.dev/)  

### Installation

#### 1. Clone the repo
```

git clone https://github.com/0xAnuR4g/podium-ai.git
cd podium-ai
```
#### 2. Setup Backend

```
cd backend
uv venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
uv pip install -r requirements.txt
```
##### Create a .env file in podium-ai-backend/ and add:

```
GEMINI_API_KEY=your_api_key_here
```
##### Run the backend

```
uv run fastapi dev main.py
```
#### 3. Setup Frontend (Next.js)
```
cd frontend
npm install
npm run dev
```


git clone https://github.com/0xAnuR4g/podium-ai.git
cd podium-ai
