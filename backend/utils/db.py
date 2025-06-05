from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["AltiusDrive"]

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

if not "resources" in db.list_collection_names():
    db.create_collection("resources", validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "user_id"],
            "properties": {
                "name": {"type": "string"},
                "author": {"type": "string"},
                "rate": {"bsonType": "string"},
                "description": {"type": "string"},
                "rating": {"bsonType": "string"},
                "user_id": {"type": "string"}
            }
        }
    })

def get_db():
    return db

