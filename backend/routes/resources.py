from flask import Flask, Blueprint, request, jsonify
from utils.db import get_db
from flask_jwt_extended import decode_token
from bson.objectid import ObjectId

resoucre_bp = Blueprint('resource',__name__)

@resoucre_bp.route("/", methods=["GET"])
def get_resources():
    db = get_db()
    resources = db.resources.find()
    resource_list = []
    for resource in resources:
        resource['_id'] = str(resource['_id'])
        resource_list.append(resource)
    return jsonify(resource_list), 200

# db.create_collection("resources", validator={
#         "$jsonSchema": {
#             "bsonType": "object",
#             "required": ["name", "user_id"],
#             "properties": {
#                 "name": {"type": "string"},
#                 "author": {"type": "string"},
#                 "rate": {"bsonType": "double"},
#                 "description": {"type": "string"},
#                 "rating": {"bsonType": "double"},
#                 "user_id": {"type": "string"}
#             }
#         }
#     })
    
@resoucre_bp.route("/", methods=["POST"])
def create_resource():
    token = request.headers.get('Authorization')
    if not token:
        return {"message": "Token is missing"}, 401
    try:
        decoded_token = decode_token(token)
        user_id = decoded_token['sub']
    except Exception as e:
        print(f"Token decoding error: {e}")
        return {"message": "Invalid token"}, 401
    data = request.get_json()
    if not data or 'name' not in data:
        return {"message": "Invalid input"}, 400
    db = get_db()
    try:
        resource = {
            "name": data['name'],
            "author": data.get('author', ''),
            "rate": data.get('rate', 0.0),
            "description": data.get('description', ''),
            "rating": data.get('rating', 0.0),
            "user_id": user_id
        }
        result = db.resources.insert_one(resource)
        if not result.acknowledged:
            return {"message": "Failed to create resource"}, 500
        resource_id = result.inserted_id
        return jsonify({"id": str(resource_id)}), 201
    except Exception as e:
        print(f"Database error: {e}")
        return {"message": "Internal server error"}, 500

@resoucre_bp.route("/<resource_id>", methods=["PUT"])
def update_resource(resource_id):
    token = request.headers.get('Authorization')
    if not token:
        return {"message": "Token is missing"}, 401
    try:
        decoded_token = decode_token(token)
        user_id = decoded_token['sub']
    except Exception as e:
        return {"message": "Invalid token"}, 401
    data = request.get_json()
    resource = {
        "name": data.get('name'),
        "author": data.get('author', ''),
        "rate": data.get('rate', 0.0),
        "description": data.get('description', ''),
        "rating": data.get('rating', 0.0),
    }
    db = get_db()
    result = db.resources.find_one_and_update(
        {"_id": ObjectId(resource_id)},
        {"$set": resource},
        return_document=True
    )
    print(result)
    return jsonify({"message": "Resource updated successfully"}), 200

@resoucre_bp.route("/<resource_id>", methods=["DELETE"])
def delete_resource(resource_id):
    token = request.headers.get('Authorization')
    if not token:
        return {"message": "Token is missing"}, 401
    try:
        decoded_token = decode_token(token)
        user_id = decoded_token['sub']
    except Exception as e:
        return {"message": "Invalid token"}, 401
    db = get_db()
    result = db.resources.delete_one({"_id": ObjectId(resource_id), "user_id": user_id})
    if result.deleted_count == 0:
        return {"message": "Resource not found"}, 404
    return jsonify({"message": "Resource deleted successfully"}), 200
