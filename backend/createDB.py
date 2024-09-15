from langchain_iris import IRISVector

def create_db(embeddings, docs, COLLECTION_NAME, CONNECTION_STRING):
    db = IRISVector.from_documents(
        embedding=embeddings,
        documents=docs,
        collection_name=COLLECTION_NAME,
        connection_string=CONNECTION_STRING,
    )
    return db

# after initial db creation, to reconnect
def reconnect_db(embeddings, COLLECTION_NAME, CONNECTION_STRING):
    db = IRISVector(
        embedding_function=embeddings,
        dimension=1536,
        collection_name=COLLECTION_NAME,
        connection_string=CONNECTION_STRING,
    )
    return db

# print(f"Number of docs in vector store: {len(db.get()['ids'])}")