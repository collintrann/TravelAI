import os
# from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_community.document_loaders.text import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_iris import IRISVector
from langchain import hub
from langchain.prompts import PromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# load_dotenv(override=True)

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

# db = IRISVector.from_documents(
#     embedding=embeddings,
#     documents=docs,
#     collection_name=COLLECTION_NAME,
#     connection_string=CONNECTION_STRING,
# )

# after initial install
db = IRISVector(
    embedding_function=embeddings,
    dimension=1536,
    collection_name=COLLECTION_NAME,
    connection_string=CONNECTION_STRING,
)

print(f"Number of docs in vector store: {len(db.get()['ids'])}")

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
# retriever = db.as_retriever()
retriever = db.as_retriever(search_type='similarity', search_kwargs={"k": 5})

#retrieved_docs = retriever.invoke("What is related to Maine?")
# for doc in retrieved_docs:
#     print(doc)
#     print('-'*80)

# TO DO: MAKE THIS PROMPT MORE SPECIFIC
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

response = rag_chain.invoke({"input": "What should we do in Maine?"})
print(response["answer"])

# query = "Itinerary for trip to Acadia National Park"
# docs_with_score = db.similarity_search_with_score("What is related to Ukraine?", k=5)

# for doc, score in docs_with_score:
#     print("-" * 80)
#     print("Score: ", score)
#     print(doc.page_content)
#     print("-" * 80)

while True:
    user_input = input("\nYou: ")
    if user_input.lower() in ['exit', 'quit']:
        print("Assistant: Goodbye!")
        break
    response = rag_chain.invoke({"input": user_input})
    print("Assistant: ", response["answer"])