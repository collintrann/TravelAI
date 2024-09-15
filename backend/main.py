from backend import uploadTikTok
from langchain.prompts.chat import ChatPromptTemplate

tiktok_urls = []
transcriptions = []
for url in tiktok_urls:
    transcription = uploadTikTok.upload_and_transcribe_tiktok(url)
    transcriptions.append(transcription)




template = template = ChatPromptTemplate.from_messages(
        [
            ("system", 
                """
                You are a helpful Travel AI assistant expert in creating travel itineraries. Based on the user's saved
                TikTok videos, you will help them create a travel itinerary for their next vacation.
                """
                ),
                ("user", "{question} \n chat history: {chat_history} \n ai: "),
        ]
    )


