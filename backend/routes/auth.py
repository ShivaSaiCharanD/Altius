from flask import request, jsonify, Blueprint
from utils.db import get_db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    db = get_db()
    
    
    if username and password:
        user = db.users.find_one({"username": username})
        if user and check_password_hash(user['password'], password):
            access_token = create_access_token(identity=str(user['_id']))
            return jsonify({"token": access_token}), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    db = get_db()
    if username and password:
        existing_user = db.users.find_one({"username": username})
        if existing_user:
            return jsonify({"message": "User already exists"}), 409
        else:
            db.users.insert_one({"username": username, "password": generate_password_hash(password)})
            return jsonify({"message": "User registered successfully"}), 201
    else:
        return jsonify({"message": "Invalid input"}), 400
    



