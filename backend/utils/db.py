from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["Altius"]

if not "users" in db.list_collection_names():
    db.create_collection("users", validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["username", "password"],
            "properties": {
                "username": {"type": "string"},
                "password": {"type": "string"}
            }
        }
    })

def get_db():
    return db

