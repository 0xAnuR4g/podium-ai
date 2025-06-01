from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gemini import generate_speech
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SpeechRequest(BaseModel) :
    bullets : str
    tone : str = "Formal"
    format : str = "Speech"


@app.post('/generate')
def generate(request : SpeechRequest) :
    try:
        result = generate_speech(
            bullets = request.bullets,
            tone = request.tone,
            format = request.format
        )

        return {"result" : result}
    
    except Exception as e:

        return {"error" : str(e)}
