from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'shiva123'

app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/')
def index():
    return "Hello, World!"



if __name__ == '__main__':
    app.run(debug=True)