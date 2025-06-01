import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")

SPEECH_PROMPTS = {
    "Formal": """
You are a professional speechwriter creating polished, formal speeches for executives and public figures. 
Create a cohesive, flowing speech that:
- Has a clear introduction, body, and conclusion
- Uses sophisticated vocabulary and sentence structure
- Maintains a serious, authoritative tone
- Includes smooth transitions between points
- Is approximately 3-5 minutes when spoken
- Uses rhetorical devices effectively
""",
    "Conversational": """
You are creating an engaging, conversational speech that feels natural and relatable.
Create a speech that:
- Uses everyday language and relatable examples
- Includes personal anecdotes or stories where appropriate
- Has a warm, approachable tone
- Engages the audience directly
- Flows naturally like a conversation
- Is approximately 3-5 minutes when spoken
""",
    "Executive": """
You are crafting a high-level executive presentation for business leaders.
Create a speech that:
- Is direct, concise, and results-oriented
- Uses business terminology appropriately
- Focuses on key insights and actionable items
- Maintains professional authority
- Includes data-driven language where relevant
- Is approximately 3-5 minutes when spoken
""",
}

BRIEFING_PROMPTS = {
    "Formal": """
You are preparing a formal press briefing for official communications.
Create a structured briefing that:
- Opens with a clear statement of purpose
- Addresses each key point systematically
- Maintains official, diplomatic language
- Includes potential Q&A sections
- Uses precise, factual language
- Follows government/corporate briefing format
""",
    "Conversational": """
You are creating a media briefing that's informative yet accessible.
Create a briefing that:
- Uses clear, jargon-free language
- Explains complex topics simply
- Maintains a helpful, informative tone
- Anticipates common questions
- Includes relatable explanations
- Balances professionalism with approachability
""",
    "Executive": """
You are preparing a high-level briefing for stakeholders and media.
Create a briefing that:
- Leads with key business impact
- Uses confident, decisive language
- Focuses on strategic implications
- Includes forward-looking statements
- Addresses potential concerns proactively
- Maintains executive-level gravitas
""",
}


def generate_speech(bullets, tone="Formal", format="Speech"):
    if format == "Speech":
        prompt = SPEECH_PROMPTS[tone]
        content_type = "a speech"
    elif format == "PressBrief":
        prompt = BRIEFING_PROMPTS[tone]
        content_type = "a formal press briefing"
    final_prompt = (
        f"You are to create {content_type} based on the following bullet points:\n"
        f"{bullets}\n"
        f"Follow these tone and structure guidelines:\n"
        f"{prompt.strip()}\n"
        "If word limit is provided in the bullet points, strictly return the result in only the given word limit."
        "Important: Do NOT include the characters \\n or '\n\n', tabs, or any markdown formatting in your response. "
        "Please write the output as plain text with natural paragraphs and line breaks."
    )

    response = model.generate_content(final_prompt)
    return response.text.strip()
