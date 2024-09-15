import uploadTikTok
from langchain.prompts.chat import ChatPromptTemplate

tiktok_urls = ['https://www.tiktok.com/t/ZP8eyUkv2/', 'https://www.tiktok.com/t/ZP8ea2JLF/', 'https://www.tiktok.com/t/ZP8eay7hP/', 'https://www.tiktok.com/t/ZP8eaS6yM/']
transcriptions = []
for url in tiktok_urls:
    transcription = uploadTikTok.upload_and_transcribe_tiktok(url)
    transcriptions.append(transcription)

for transcription in transcriptions:
    with open('backend/transcription.txt', 'a') as f:
        f.write(transcription + '\n')


# template = template = ChatPromptTemplate.from_messages(
#         [
#             ("system", 
#                 """
#                 You are a helpful Travel AI assistant expert in creating travel itineraries. Based on the user's saved
#                 TikTok videos, you will help them create a travel itinerary for their next vacation.
#                 """
#                 ),
#                 ("user", "{question} \n chat history: {chat_history} \n ai: "),
#         ]
#     )


