import os
from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_community.document_loaders.text import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_iris import IRISVector

load_dotenv(override=True)

if not os.environ.get("OPENAI_API_KEY"): 
    os.environ["OPENAI_API_KEY"] = open("backend/API_KEYS/OPENAI_API_KEY.txt").read().strip()

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

COLLECTION_NAME = "tiktok_test"

db = IRISVector.from_documents(
    embedding=embeddings,
    documents=docs,
    collection_name=COLLECTION_NAME,
    connection_string=CONNECTION_STRING,
)



print(f"Number of docs in vector store: {len(db.get()['ids'])}")

llm = ChatOpenAI(model="gpt-3.5-turbo-0125", temperature=0)
retriever = db.as_retriever()

retrieved_docs = retriever.invoke("What are some things to do in Acadia National Park?")
for doc in retrieved_docs:
    print(doc)
    print('-'*80)




# query = "Itinerary for trip to Acadia National Park"
# docs_with_score = db.similarity_search_with_score(query)

# for doc, score in docs_with_score:
#     print("-" * 80)
#     print("Score: ", score)
#     print(doc.page_content)
#     print("-" * 80)