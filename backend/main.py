import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_core.documents import Document
from langchain_community.document_loaders.text import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_iris import IRISVector
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
import uploadTikTok
import createDB

app = Flask(__name__)
CORS(app)

if not os.environ.get("OPENAI_API_KEY"): 
    os.environ["OPENAI_API_KEY"] = open("backend/API_KEYS/OPENAI_API_KEY.txt").read().strip()

tiktoks = ['https://www.tiktok.com/t/ZP8eyUkv2/', 'https://www.tiktok.com/t/ZP8ea2JLF/', 'https://www.tiktok.com/t/ZP8eay7hP/', 'https://www.tiktok.com/t/ZP8eaS6yM/']
rag_chain = None

def main(destination: str, urls: list[str]):
    global rag_chain
    tiktok_urls = urls
    transcriptions = []

    for url in tiktok_urls:
        transcription = uploadTikTok.upload_and_transcribe_tiktok(url)
        transcriptions.append(transcription)

    for transcription in transcriptions:
        with open('backend/transcription.txt', 'a') as f:
            f.write(transcription + '\n')

    loader = TextLoader('backend/transcription.txt', encoding='utf-8')
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size = 400, chunk_overlap = 20)
    docs = text_splitter.split_documents(documents)
    embeddings = OpenAIEmbeddings()

    username = 'demo'
    password = 'demo' 
    hostname = os.getenv('IRIS_HOSTNAME', 'localhost')
    port = '1972' 
    namespace = 'USER'
    CONNECTION_STRING = f"iris://{username}:{password}@{hostname}:{port}/{namespace}"

    COLLECTION_NAME = "tiktok_db"

    db = createDB.create_db(embeddings, docs, COLLECTION_NAME, CONNECTION_STRING)

    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    retriever = db.as_retriever(search_type='similarity', search_kwargs={"k": 5})


    system_prompt = (
        "You are a helpful Travel AI assistant expert in creating "
        "travel itineraries. Based on the user's saved tiktoks, "
        "you will help them create a travel itinerary for their "
        "next vacation."
        "\n\n"
        "{context}"
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", "{input}"),
        ]
    )
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)

    response = rag_chain.invoke({"input":f"What should we do in {destination}?"})
    # print(response["answer"])
    return response

    # while True:
    #     user_input = input("\nYou: ")
    #     if user_input.lower() in ['exit', 'quit']:
    #         print("Assistant: Goodbye!")
    #         break
    #     response = rag_chain.invoke({"input": user_input})
    #     print("Assistant: ", response["answer"])

@app.route('/initialize', methods=['POST'])
def initialize():
    data = request.json
    tiktok_urls = data.get('urls', [])
    destination = data.get('destination', '')
    
    if not tiktok_urls or not destination:
        return jsonify({"error": "Please provide a destination and at least 5 TikTok URLs."}), 400

    response = main(destination, tiktok_urls)
    return jsonify({'response': response['answer']}), 200

@app.route('/query', methods=['POST'])
def query():
    global rag_chain
    if rag_chain is None:
        return jsonify({"error": "Please initialize the assistant first."}), 400

    data = request.json
    user_query = data.get('input', user_query)

    if not user_query:
        return jsonify({"error": "Please provide a query."}), 400

    response = rag_chain.invoke({"input": user_query})
    return jsonify({'response': response['answer']}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

